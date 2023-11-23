import express, { Request, Response, NextFunction } from 'express';

import {
  signup,
  signin,
  getUserProfileDetails,
  saveExerciseToUser,
  getSavedExercises,
} from '../controllers/authController';
import {
  verifyToken,
  checkDuplicateUsernameOrEmail,
} from '../middleware/index';

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

authRouter.route('/saveExercise').post([verifyToken], saveExerciseToUser);

authRouter.route('/getSavedExercises').get([verifyToken], getSavedExercises);

export { authRouter };
