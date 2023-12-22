import { secretKey } from '../config';
import { User, savedExercise, savedWorkouts } from '../models/';
import jwt from 'jsonwebtoken';
import bycript from 'bcryptjs';
import { Request, Response } from 'express';
import { isDuplicateSavedExercise } from '../services';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dl4elsbqg',
  api_key: '598544228962786',
  api_secret: process.env.CLOUDINARY_KEY,
});

export const signup = async (req: Request, res: Response) => {
  // create the user and has the password using 8 salt
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bycript.hashSync(req.body.password, 8),
  });

  // Save the user in the data base
  // return an error if it was unable to save
  await user
    .save()
    .then(() => {
      res.send({ message: 'User was registered successfully!' });
      return;
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
};

/**
 * Sign In auth controller
 * validates username and password, sign jwt token and returns username and accesstoken
 */
export const signin = async (req: Request, res: Response) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.status(404).send({ message: 'User Not found.' });
  }

  // type guard to ensure password is defined and a string
  const userPassword: string = user.password !== undefined ? user.password : '';

  // compares user password to password provided in the request
  let isPasswordValid = bycript.compareSync(req.body.password, userPassword);

  if (!isPasswordValid) {
    return res.status(401).send({
      accessToken: null,
      message: 'Invalid Password!',
    });
  }
  // sign the token
  const token = jwt.sign({ id: user._id }, secretKey.secret, {
    algorithm: 'HS256',
    allowInsecureKeySizes: true,
    expiresIn: 172800, // 48 hours
  });

  // send the token, username and id
  res.status(200).send({
    id: user._id,
    username: user.username,
    accessToken: token,
  });
};

/**
 * endpoint that gather's the user's information after going throught the jwt verification
 */
export const getUserProfileDetails = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.query.id)
      .populate('savedExercises')
      .populate('savedWorkouts')
      .populate('profileImage')
      .exec();

    // const userImage = await Image.findById(user?.profileImage);
    // console.log(userImage);
    if (user) {
      // const profilePic = await Image.findById(user.profileImage);
      console.log(user);
      res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        savedExercises: user.savedExercises,
        savedWorkouts: user.savedWorkouts,
        profileImage: user.profileImage,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

export const uploadPicture = async (req: Request, res: Response) => {
  const { id } = req.query;
  const image = req.file;

  try {
    const user = await User.findById(id);
    if (user && image) {
      if (user.profileImage?.publicId) {
        await cloudinary.uploader.destroy(user.profileImage.publicId);
      }
      // Upload the image to Cloudinary
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'image', folder: 'Exercise-Lab' },
          async (error, result) => {
            if (error) {
              console.error('Error uploading to Cloudinary:', error);
              res.status(500).send('Error uploading to Cloudinary.');
              return;
            } else {
              if (result) {
                user.profileImage = {
                  url: result.secure_url,
                  filename: result.original_filename,
                  publicId: result.public_id,
                };
                await user.save();
              }
            }
          }
        )
        .end(image.buffer);
      res.status(200).send({ message: 'Image uploaded correctly' });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

// ***** exercises ****

/**
 * Endpoint used to save an exercise and add it to the user's savedExercise collection
 * @param req req.body should include the exerciseID
 */
export const saveExerciseToUser = async (req: Request, res: Response) => {
  try {
    const exerciseId = req.body.exerciseId;
    const name = req.body.exerciseName;
    // check if the exercise is already saved.
    const isDuplicate = await isDuplicateSavedExercise(exerciseId);
    if (isDuplicate) {
      // return 400 error if the exercise has already been saved for the user
      res
        .status(400)
        .send({ message: 'Exercise is already saved for your account!' });
      return;
    } else {
      // get the user id from the query as it is placed in this location by the jwt verification malware
      const user = await User.findById(req.query.id);
      // if the user exists create the exercise and save accordingly
      if (user) {
        const exercise = new savedExercise({
          exerciseId,
          user: user._id,
          name,
        });
        user.savedExercises.push(exercise._id);
        await exercise.save();
        await user.save();
        res.status(200).send({ message: 'Exercise was saved successfully!' });
        return;
      }
    }
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const getSavedExercises = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.query.id)
      .populate('savedExercises')
      .exec();

    if (user) {
      res.status(200).send({ savedExercises: user.savedExercises });
      return;
    } else {
      res.status(400).send({ message: 'No exercises saved' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

export const deleteSavedExercise = async (req: Request, res: Response) => {
  const { id } = req.body;
  // remove requested exercise from the collection
  const test = await savedExercise.findByIdAndDelete(id);

  res.status(200).send({ message: 'Exercise was deleted succesfully!' });
};

// ***** workouts *****

export const saveNewWorkout = async (req: Request, res: Response) => {
  try {
    // get userId passed by verifiy token middleware
    const userId = req.query.id;
    const { workout, workoutTitle } = req.body;
    console.log(workout);
    // get the user
    const user = await User.findById(userId);
    if (user) {
      // create workout
      const newWorkout = new savedWorkouts({
        userId,
        workoutTitle,
        workout,
      });
      // add it to user list of saved workouts
      user.savedWorkouts.push(newWorkout._id);
      await newWorkout.save();
      await user.save();
      res.status(200).send({ message: 'Workout was saved successfully!' });
    }
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const getSavedWorkouts = async (req: Request, res: Response) => {
  try {
    // user id from verify token malware
    const user = await User.findById(req.query.id)
      .populate('savedWorkouts')
      .exec();

    if (user) {
      // return user's saved workouts
      res.status(200).send({
        workouts: user.savedWorkouts,
      });
      return;
    }
  } catch (error: any) {
    res.status(500).send({ message: error });
    return;
  }
};

export const getWorkout = async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.query;
    const workout = await savedWorkouts.findById(workoutId);
    if (workout) {
      res.status(200).send({ workout });
      return;
    } else {
      res.send(400).send({ message: 'Workout Does not exist!' });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

export const deleteSavedWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const { workoutId } = req.body;
    const user = await User.findById(id);

    if (user) {
      console.log(workoutId);
      await user.updateOne({ $pull: { savedWorkouts: workoutId } });
      res.status(200).send({ message: 'Workout was deleted successfully!' });
      return;
    } else {
      res.status(400).send({ message: 'User not found!' });
      return;
    }
  } catch (error) {}
};

export const deleteExerciseFromWorkout = async (
  req: Request,
  res: Response
) => {
  try {
    const { exerciseId, workoutId } = req.body;
    const workout = await savedWorkouts.findById(workoutId);
    if (workout) {
      await workout.updateOne({ $pull: { workout: { _id: exerciseId } } });
      res.status(200).send({ message: 'Exercise was deleted succesfully' });
      return;
    } else {
      res.status(400).send({ message: 'Exercise not found!' });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};
