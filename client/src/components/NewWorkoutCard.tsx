import React, { useState } from 'react';
import { trashIcon } from '../assets';
import { WorkoutExercises } from '../types';
import { useGetAccessToken } from '../hooks';
import axios from 'axios';

interface NewWorkOutProps {
  workoutExercises: WorkoutExercises[];
  deleteFromWorkout: (indexToRemove: number) => void;
}
const NewWorkoutCard: React.FC<NewWorkOutProps> = ({
  workoutExercises,
  deleteFromWorkout,
}) => {
  const [workoutTitle, setWorkoutTitle] = useState('');
  const token = useGetAccessToken();

  const submitWorkout = async (event: React.FormEvent) => {
    // remember that the workoutexecises array has the template entry at index 0
    event.preventDefault();
    const workoutToSubmit = workoutExercises.filter(
      (execise) => execise.exerciseId !== ''
    );
    const { data } = await axios.post(
      'http://localhost:4500/auth/saveNewWorkout',
      {
        workoutTitle: workoutTitle,
        workout: workoutToSubmit,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(data);
  };

  const list = workoutExercises?.map((exercise, index) => {
    return (
      <li
        key={index}
        className='bg-secondary w-[90%] h-10 flex items-center justify-evenly rounded-lg text-white relative'>
        <h4 className='font-bold leading-4 text-md py-2 '>{exercise.name}</h4>
        <p>Reps: {exercise.reps}</p>
        <p>Sets: {exercise.sets}</p>
        <button
          type='button'
          onClick={() => deleteFromWorkout(index)}
          className='bg-primary w-8 h-8 text-black rounded-full flex items-center justify-center'>
          <img
            src={trashIcon}
            alt='delete workout exercise'
            className='w-6 h-6'
          />
        </button>
      </li>
    );
  });

  return (
    <div className='w-[350px] h-[400px] md:h-[573px] md:w-[647px] bg-[#F8F4F4] rounded-[45px] shadow-xl text-center overflow-auto pb-5 px-3 relative'>
      <div className='flex justify-center items-center my-3'>
        <form className='my-3 w-full' onSubmit={submitWorkout}>
          <label
            htmlFor='workoutName'
            className='font-bold leading-7 text-xl mb-3 py-5 '>
            Workout Name:
          </label>
          <input
            type='text'
            name='workoutName'
            id='workoutName'
            value={workoutTitle}
            onChange={(event) => setWorkoutTitle(event.target.value)}
            required
            className='bg-tertiary rounded-md mx-2 px-2'
          />
          <div className='mt-3'>
            <ul className='flex flex-col gap-5 py-3 items-center justify-center overflow-auto min-h-[200px] max-h-[400px]'>
              {/* TODO style scrollbar  */}
              {list}
            </ul>
          </div>
          <div>
            {workoutExercises.length >= 1 && (
              <button
                type='submit'
                className='bg-secondary text-white mt-3 p-2 rounded-lg'>
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewWorkoutCard;
