import mongoose from 'mongoose';

const userSavedExercisesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  exerciseId: { type: String, required: true }, // object Id from exercise
  name: { type: String, required: true },
});

export const savedExercise = mongoose.model(
  'SavedExercise',
  userSavedExercisesSchema
);
