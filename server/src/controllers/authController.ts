import { secretKey } from '../config';
import { User, savedExercise } from '../models/';
import jwt from 'jsonwebtoken';
import bycript from 'bcryptjs';
import { Request, Response } from 'express';
import { isDuplicateSavedExercise } from '../services';

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
 *
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
      .exec();
    if (user) {
      res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        savedExercises: user.savedExercises,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

/**
 * Endpoint used to save an exercise and add it to the user's savedExercise collection
 * @param req res.body should include the exerciseID
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
    } else {
      res.status(400).send({ message: 'No exercises saved' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};
