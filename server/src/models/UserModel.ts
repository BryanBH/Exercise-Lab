import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  savedExercises: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'SavedExercise' },
  ],
  savedWorkouts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'SavedWorkouts' },
  ],
  profileImage: {
    url: String,
    filename: String,
    publicId: String,
  },
});

export const User = mongoose.model('User', UserSchema);
