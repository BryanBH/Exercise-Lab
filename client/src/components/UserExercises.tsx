import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { savedExercises } from '../types/index';
import { useGetAccessToken } from '../hooks';
import { trashIcon } from '../assets';
import axios from 'axios';
import mongoose from 'mongoose';

const UserExercises: React.FC = () => {
  const token = useGetAccessToken();
  const [exercises, setexercises] = useState<savedExercises[]>();

  const deleteExercise = async (
    id: string | mongoose.Schema.Types.ObjectId
  ) => {
    if (token) {
      try {
        await axios.post(
          'http://localhost:4500/auth/deleteSavedExercise',
          { id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data } = await axios.get(
          'http://localhost:4500/auth/getSavedExercises',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setexercises(data.savedExercises);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getSavedExercises = async () => {
      const { data } = await axios.get(
        'http://localhost:4500/auth/getSavedExercises',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setexercises(data.savedExercises);
    };
    getSavedExercises();
  }, [token]);
  const exerciseItems = exercises?.map((exercise) => {
    return (
      <li
        className='bg-secondary w-[90%] h-10 flex items-center justify-evenly rounded-lg text-white'
        key={exercise.name}>
        <h4 className='mx-auto'>
          <Link to={`/exercises/${exercise.exerciseId}`}>{exercise.name}</Link>
        </h4>
        <button
          className='bg-white p-0.5 mx-2 rounded-lg'
          onClick={() => deleteExercise(exercise._id)}>
          <img src={trashIcon} alt='delete-saved-exercise' />
        </button>
      </li>
    );
  });

  return (
    <div className='w-[350px] h-[400px] md:h-[573px] md:w-[647px] bg-[#F8F4F4] rounded-[45px] shadow-xl text-center overflow-auto'>
      <h1 className='font-bold leading-7 text-2xl mb-3 py-5'>
        My Saved Exercises
      </h1>
      <div className='mb-8'>
        <ul className='flex flex-col gap-5 items-center justify-center '>
          {/* TODO style scrollbar  */}
          {exerciseItems}
        </ul>
      </div>
    </div>
  );
};

export default UserExercises;
