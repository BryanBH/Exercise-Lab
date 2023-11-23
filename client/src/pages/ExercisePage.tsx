import React, { useState, useEffect } from 'react';
import { muscleGroups } from '../data';
import { muscleResults } from '../types';
import { ExerciseCard } from '../components';
import axios from 'axios';

const ExercisePage: React.FC = () => {
  const [muscle, setmuscle] = useState(muscleGroups[0]);
  const [page, setpage] = useState(1);
  const [totalpages, settotalpages] = useState(1);
  const [exercies, setexercies] = useState<muscleResults[]>([
    {
      name: '',
      force: '',
      level: '',
      mechanic: '',
      equipment: '',
      primaryMuscles: [''],
      secondaryMuscles: [''],
      instructions: [''],
      category: '',
      images: [''],
      id: '',
    },
  ]);

  const handleMuscleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setmuscle(event.target.value);
  };

  const handlePageChange = (pageChangeValue: number) => {
    console.log(`change value ${pageChangeValue}, total pages: ${totalpages}`);
    if (pageChangeValue === 1) {
      if (page < totalpages) {
        setpage(page + 1);
      } else {
        setpage(page);
      }
    } else {
      if (page > 1) {
        setpage(page - 1);
      } else {
        setpage(1);
      }
    }
  };
  const handleSubmit = async () => {};

  useEffect(() => {
    const getExercies = async () => {
      const { data } = await axios.get(
        'http://localhost:4500/exercises/getExerciseByMuscleGroup',
        {
          params: { muscle, limit: 10, page },
        }
      );
      setexercies(data.muscleGroup);
      setpage(data.currentPage);
      settotalpages(data.totalPages);
    };

    getExercies();
  }, [muscle, page]);

  const CardsList = exercies?.map((exersice) => {
    return <ExerciseCard {...exersice} key={exersice.id} />;
  });

  return (
    <div className='w-full flex flex-col'>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <label> Select muscle group: </label>
          <select
            id='muscles'
            className='mx-2 p-2 w-lg cursor-pointer hover:shadow-lg form-select'
            onChange={handleMuscleChange}>
            {muscleGroups.map((muscle) => {
              return <option key={muscle} value={muscle} label={muscle} />;
            })}
          </select>
        </form>
      </div>
      <div>
        <button
          onClick={() => handlePageChange(-1)}
          className='bg-blue-500 mx-2'>
          Back
        </button>
        <button onClick={() => handlePageChange(1)} className='bg-blue-500'>
          {' '}
          Next{' '}
        </button>
      </div>
      <div>page: {page} </div>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 content-around place-items-center'>
        {CardsList}
      </div>
    </div>
  );
};

export default ExercisePage;
