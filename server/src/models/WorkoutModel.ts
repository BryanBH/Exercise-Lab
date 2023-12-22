import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  workoutTitle: { type: String, required: true },
  workout: [
    {
      exerciseId: { type: String, required: true },
      name: { type: String, required: true },
      reps: { type: Number, required: true },
      sets: { type: Number, required: true },
    },
  ],
});

export const savedWorkouts = mongoose.model('SavedWorkouts', WorkoutSchema);
