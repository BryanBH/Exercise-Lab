import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { savedExercises } from '../types/index';
import { useGetAccessToken } from '../utils';
import axios from 'axios';

const UserExercises: React.FC = () => {
  const token = useGetAccessToken();
  const [exercises, setexercises] = useState<[savedExercises]>([
    { _id: '', name: '', exerciseId: '', user: '' },
  ]);

  useEffect(() => {
    const getSavedExercises = async () => {
      if (token) {
        try {
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
    getSavedExercises();
  }, [token]);

  const exerciseItems = exercises.map((exercise) => {
    if (exercise._id === '') return;
    return (
      <li
        className='bg-secondary w-[90%] h-10 flex items-center justify-evenly rounded-lg text-white'
        key={exercise.name}>
        <h4 className='mx-5'>
          <Link to={`/exercises/${exercise.exerciseId}`}>{exercise.name}</Link>
        </h4>
        <button className='mx-5'>Add to workout</button>
        <button className='mx-5'>Delete Exercise</button>
      </li>
    );
  });

  return (
    <div className='w-[350px] h-[400px] md:h-[573px] md:w-[647px] bg-[#F8F4F4] rounded-[45px] shadow-xl text-center'>
      <h1 className='font-bold leading-7 text-2xl mb-3 py-5'>My Exercises</h1>
      <div>
        <ul className='flex flex-col gap-5 items-center justify-center overflow-hidden'>
          {/* TODO style scrollbar  */}
          {exerciseItems}
        </ul>
      </div>
    </div>
  );
};

export default UserExercises;