import mongoose from 'mongoose';
export interface ExersicesType {
  currentPage: number;
  totalPages: number;
  muscleGroup: muscleResults[];
}

export interface muscleResults {
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  id: string;
}

export interface ExerciseInformation {
  _id: mongoose.ObjectId | string;
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  id: string;
}

// ***************** User info ***************
export interface UserInfo {
  username: string;
  email: string;
  password: string;
}

export interface savedExercises {
  _id: mongoose.ObjectId | string;
  user: mongoose.ObjectId | string;
  exerciseId: string;
  name: string;
}
export interface UserProfileInformation {
  username: string;
  email: string;
  savedExercises: [savedExercises];
}

export interface FlashMessageType {
  message: string;
  type: string;
  sendTo?: string | null;
}
