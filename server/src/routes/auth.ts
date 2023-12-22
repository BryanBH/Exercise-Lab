import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import {
  signup,
  signin,
  getUserProfileDetails,
  uploadPicture,
  saveExerciseToUser,
  getSavedExercises,
  deleteSavedExercise,
  saveNewWorkout,
  getSavedWorkouts,
  getWorkout,
  deleteSavedWorkout,
  deleteExerciseFromWorkout,
} from '../controllers/authController';
import {
  verifyToken,
  checkDuplicateUsernameOrEmail,
} from '../middleware/index';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRouter = express.Router();
authRouter.use((req: Request, res: Response, next: NextFunction) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

authRouter.route('/signup').post([checkDuplicateUsernameOrEmail], signup);

authRouter.route('/signin').post(signin);

authRouter.route('/profile').get([verifyToken], getUserProfileDetails);

authRouter
  .route('/uploadProfilePic')
  .post([verifyToken, upload.single('image')], uploadPicture);

authRouter.route('/saveExercise').post([verifyToken], saveExerciseToUser);

authRouter.route('/getSavedExercises').get([verifyToken], getSavedExercises);

authRouter
  .route('/deleteSavedExercise')
  .post([verifyToken], deleteSavedExercise);

authRouter.route('/saveNewWorkout').post([verifyToken], saveNewWorkout);

authRouter.route('/getSavedWorkouts').get([verifyToken], getSavedWorkouts);

authRouter.route('/getWorkout').get([verifyToken], getWorkout);

authRouter.route('/deleteSavedWorkout').post([verifyToken], deleteSavedWorkout);
authRouter
  .route('/deleteExerciseFromWorkout')
  .post([verifyToken], deleteExerciseFromWorkout);

export { authRouter };
