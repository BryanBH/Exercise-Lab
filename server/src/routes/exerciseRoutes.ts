import express from 'express';
import {
  getExerciseByMuscleGroup,
  getExerciseByID,
} from '../controllers/exerciseController';
const exerciseRouter = express.Router();

exerciseRouter.route('/getExerciseByMuscleGroup').get(getExerciseByMuscleGroup);

exerciseRouter.route('/getExerciseById').get(getExerciseByID);

export { exerciseRouter };
