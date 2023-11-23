import { Request, Response } from 'express';
import { Exercise } from '../models/ExerciseModel';

export const getExerciseByMuscleGroup = async (req: Request, res: Response) => {
  try {
    const { muscle, page = 1, limit = 10 } = req.query;
    // exec query with page and limit
    const muscleGroup = await Exercise.find({ primaryMuscles: [muscle] })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    // get total num of documents
    const count = await Exercise.find({ primaryMuscles: [muscle] }).count();
    // return json with data, total pages and current page
    res.status(200).json({
      muscleGroup,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const getExerciseByID = async (req: Request, res: Response) => {
  try {
    // get ObjectId from Query params
    const { exerciseId } = req.query;

    // get exercise and return the details
    const exercise = await Exercise.findById(exerciseId);
    res.status(200).json(exercise);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
