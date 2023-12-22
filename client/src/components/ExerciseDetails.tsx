import React, { useState } from 'react';
import { ExerciseInformation } from '../types';
import { toUppercaseWord } from '../utils/toUppercase';
import axios from 'axios';
import { useGetAccessToken } from '../hooks';
import Flash from './Flash';
import { FlashMessageType } from '../types';
import { useNavigate } from 'react-router-dom';

const ExerciseDetails: React.FC<ExerciseInformation> = (exercise) => {
  const token = useGetAccessToken();
  const navigate = useNavigate();
  const [flashToggle, setFlashToggle] = useState(false);
  const [flashInformation, setflashInformation] = useState<FlashMessageType>({
    message: '',
    type: 'success',
    sendTo: null,
  });
  const handleSaveExercise = async () => {
    console.log(exercise._id);
    if (token) {
      try {
        const { data } = await axios.post(
          'http://localhost:4500/auth/saveExercise',
          {
            exerciseId: exercise._id,
            exerciseName: exercise.name,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFlashToggle(true);
        setflashInformation({ type: 'success', message: data.message });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error)
        setFlashToggle(true);
        const { message } = error.response.data;
        setflashInformation({ type: 'error', message });
      }
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      {flashToggle && (
        <Flash {...flashInformation} setToggle={setFlashToggle} />
      )}
      <div className='h-full flex justify-center items-center flex-col md:flex-row m-3 mb-10'>
        <div className='relative md:w-3/5 order-last md:order-first mb-3'>
          <img
            src={`${exercise.images[0]}`}
            alt='exercise image 1'
            className='exercise-images-before relative top-0 rounded-xl shadow-md'
          />
          <img
            src={`${exercise.images[1]}`}
            alt='exercise image 1'
            className='exercise-images-after absolute top-0 rounded-xl shadow-md'
          />
        </div>
        <div className='md:w-2/5 m-3 p-3'>
          <h1 className='font-bold text-center text-3xl my-3'>
            {exercise.name}
          </h1>
          <p className='text-xl mb-3 px-3'>{exercise.instructions}</p>
          <ul className=' flex flex-col gap-2'>
            <li>
              <strong>Primary Muscle</strong>: {exercise.primaryMuscles}
            </li>
            <li>
              {exercise.secondaryMuscles.length > 0
                ? `Secondary Muscle: ${exercise.secondaryMuscles}`
                : ''}
            </li>
            <li>{toUppercaseWord(exercise.category)}</li>
            <li>
              {toUppercaseWord(exercise.mechanic)} {exercise.level} movement
            </li>
            <li>
              <button
                onClick={handleSaveExercise}
                className='bg-secondary p-2 rounded-md text-center text-white'>
                Save Exercise
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ExerciseDetails;
