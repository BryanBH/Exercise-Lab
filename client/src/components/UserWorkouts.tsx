import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import { Link } from 'react-router-dom';
import { SavedWorkouts } from '../types';
import { useGetAccessToken } from '../hooks';
import { trashIcon } from '../assets';

const UserWorkouts: React.FC = () => {
  const [workouts, setworkouts] = useState<SavedWorkouts[]>([]);
  const token = useGetAccessToken();

  // delete workout and update state
  const deleteWorkout = async (
    workoutId: string | mongoose.Schema.Types.ObjectId
  ) => {
    await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/deleteSavedWorkout`,
      { workoutId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/auth/getSavedWorkouts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setworkouts(data.workouts);
  };

  useEffect(() => {
    const getSavedWorkouts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/auth/getSavedWorkouts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setworkouts(data.workouts);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    };
    getSavedWorkouts();
  }, [token]);

  const workoutItems = workouts.map((workout, index) => {
    return (
      <li
        key={index}
        className='bg-tertiary w-[90%] h-10 flex items-center justify-evenly rounded-lg'>
        <h4 className='font-bold leading-5 text-xl py-2 text-white mx-auto'>
          <Link to={`/workout/${workout._id}`}>{workout.workoutTitle}</Link>
        </h4>
        <button
          className='bg-white p-0.5 mx-2 rounded-lg'
          onClick={() => deleteWorkout(workout._id)}>
          <img src={trashIcon} alt='delete workout' />
        </button>
      </li>
    );
  });
  return (
    <div className='w-[350px] h-[400px] md:h-[573px] md:w-[647px] bg-dark dark:bg-extraDark text-light rounded-[45px] shadow-xl text-center overflow-auto pb-5 relative'>
      <div className='flex justify-center items-center relative'>
        <h1 className='font-bold leading-7 text-2xl mb-3 py-5 '>My Workouts</h1>
        <button className='absolute top-5 right-8 bg-tertiary w-8 h-8 rounded-full text-3xl flex justify-center items-end'>
          <Link to='/newWorkout'>+</Link>
        </button>
      </div>
      <div>
        <ul className='flex flex-col gap-5 items-center justify-center overflow-hidden'>
          {workoutItems}
        </ul>
      </div>
    </div>
  );
};

export default UserWorkouts;
