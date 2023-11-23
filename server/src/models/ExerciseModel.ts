import mongoose, { mongo } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  force: { type: String },
  level: { type: String, required: true },
  mechanic: { type: String },
  equipment: { type: String },
  primaryMuscles: { type: [String], required: true },
  secondaryMuscles: { type: [String], required: true },
  instructions: { type: [String], required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  id: String,
});

exerciseSchema.plugin(paginate);

// interface ExerciseDocument extends mongoose.Document, ExerciseData{}

export const Exercise = mongoose.model('Exercises', exerciseSchema);
