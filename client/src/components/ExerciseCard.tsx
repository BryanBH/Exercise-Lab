import '../styles/exercise.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { ExerciseInformation } from '../types';

const ExerciseCard: React.FC<ExerciseInformation> = (exercise) => {
  return (
    <div className='flex flex-col justify-center items-center mb-3 p-2 border-2 rounded-xl max-w-md cursor-pointer shadow-lg hover:shadow-2xl'>
      <Link to={`/exercises/${exercise._id}`}>
        <div className='relative my-2 px-2 flex items-center justify-center'>
          <img
            src={exercise.images[0]}
            alt={exercise.name}
            className='exercise-images-before max-h-[350px] max-w-[350px] relative top-0 rounded'
          />
          <img
            src={exercise.images[1]}
            alt={exercise.name}
            className='exercise-images-after max-h-[350px] max-w-[350px] absolute top-0 rounded'
          />
        </div>
        <div className='flex justify-center items-center py-2'>
          <h1 className='text-2xl text-center font-bold'>{exercise.name}</h1>
        </div>
      </Link>
    </div>
  );
};

export default ExerciseCard;
