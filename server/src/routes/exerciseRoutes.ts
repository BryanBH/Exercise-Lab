import express from 'express';
import {
  getExerciseByMuscleGroup,
  getExerciseByID,
  getVideos
} from '../controllers/exerciseController';
const exerciseRouter = express.Router();

exerciseRouter.route('/getExerciseByMuscleGroup').get(getExerciseByMuscleGroup);

exerciseRouter.route('/getExerciseById').get(getExerciseByID);

exerciseRouter.route('/getVideos').get(getVideos)

export { exerciseRouter };
