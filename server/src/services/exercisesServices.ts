import { savedExercise } from '../models';

export const isDuplicateSavedExercise = async (id: string) => {
  const data = await savedExercise.find({ exerciseId: id }).exec();

  const value = data.length > 0 ? true : false;

  return value;
};
