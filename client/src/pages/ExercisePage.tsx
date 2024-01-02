import React, { useState, useEffect } from 'react';
import { muscleGroups } from '../data';
import { muscleResults } from '../types';
import { ExerciseCard, LoadingCard, Pagination } from '../components';
import axios from 'axios';

const ExercisePage: React.FC = () => {
  const [muscle, setmuscle] = useState(muscleGroups[0]);
  const [page, setpage] = useState(1);
  const [totalpages, settotalpages] = useState(1);
  const [exercies, setexercies] = useState<muscleResults[]>([]);
  const [loading, setloading] = useState(false);

  const handleMuscleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setmuscle(event.target.value);
  };

  const handlePageChange = (pageChangeValue: number) => {
    if (pageChangeValue === 1) {
      if (page < totalpages) {
        setpage(page + 1);
      } else {
        setpage(1);
      }
    } else if (pageChangeValue === -1) {
      if (page > 1) {
        setpage(page - 1);
      } else {
        setpage(1);
      }
    } else {
      if (pageChangeValue < totalpages) {
        setpage(pageChangeValue);
      } else {
        setpage(totalpages);
      }
    }
  };

  useEffect(() => {
    const getExercises = async () => {
      setloading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/exercises/getExerciseByMuscleGroup`,
        {
          params: { muscle, limit: 10, page },
        }
      );
      setexercies(data.muscleGroup);
      setpage(data.currentPage);
      settotalpages(data.totalPages);
      setloading(false);
    };

    getExercises();
  }, [muscle, page]);

  const CardsList = exercies?.map((exersice) => {
    return <ExerciseCard _id={''} {...exersice} key={exersice.id} />;
  });

  const LoadingList = exercies?.map((_, index) => {
    return <LoadingCard key={index} />;
  });

  return (
    <div className='w-full flex flex-col'>
      <div className='flex justify-center mt-5 text-dark dark:text-light'>
        <form>
          <label> Select muscle group: </label>
          <select
            id='muscles'
            className='rounded mx-2 p-2 w-lg cursor-pointer hover:shadow-lg form-select bg-dark dark:bg-secondary'
            onChange={handleMuscleChange}>
            {muscleGroups.map((muscle) => {
              return <option key={muscle} value={muscle} label={muscle} />;
            })}
          </select>
        </form>
      </div>
      <Pagination
        page={page}
        totalpages={totalpages}
        pageChange={handlePageChange}
      />
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 content-around place-items-center'>
        {loading ? LoadingList : CardsList}
      </div>
      {!loading && (
        <Pagination
          page={page}
          totalpages={totalpages}
          pageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ExercisePage;
