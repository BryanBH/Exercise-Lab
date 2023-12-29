import React, { useState } from 'react';
import { savedExercises } from '../types';
import { Link } from 'react-router-dom';

interface props {
  exercise: savedExercises;
  addToWorkout: (exercise: savedExercises, reps: string, sets: string) => void;
}
const WorkoutExerciseItem: React.FC<props> = ({ exercise, addToWorkout }) => {
  const [formToggle, setformToggle] = useState(false);
  const [reps, setreps] = useState('1');
  const [sets, setsets] = useState('1');

  if (exercise._id === '') return;
  return (
    <li
      className='bg-tertiary w-[90%] flex items-center justify-center rounded-lg text-white py-2'
      key={exercise.name}>
      {formToggle && (
        <button
          className='bg-secondary text-light p-2 mx-2 rounded-full w-8 h-8 text-lg flex justify-center items-center'
          onClick={() => setformToggle(!formToggle)}>
          X
        </button>
      )}
      <h4 className='mx-auto'>
        <Link to={`/exercises/${exercise.exerciseId}`}>{exercise.name}</Link>
      </h4>
      {formToggle ? (
        <form className='flex justify-center items-center'>
          <div>
            <label htmlFor='reps'>Reps: </label>
            <input
              type='number'
              name='reps'
              id='reps'
              className='ps-2 w-12 me-3 text-black'
              required
              value={reps}
              min='1'
              step='1'
              onChange={(e) => setreps(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='sets'>Sets: </label>
            <input
              type='number'
              name='sets'
              id='sets'
              className='ps-2 w-12 text-black'
              required
              value={sets}
              min='1'
              step='1'
              onChange={(e) => setsets(e.target.value)}
            />
          </div>
          <button
            type='button'
            className='bg-secondary p-1 m-2 rounded text-light text-sm flex justify-center items-center'
            onClick={() => {
              addToWorkout(exercise, reps, sets);
              setreps('1');
              setsets('1');
              setformToggle(!formToggle);
            }}>
            Submit
          </button>
        </form>
      ) : (
        <button
          className='bg-secondary p-2 mx-2 rounded-full w-8 h-8 text-light text-2xl flex justify-center items-center'
          onClick={() => setformToggle(!formToggle)}>
          +
        </button>
      )}
    </li>
  );
};

export default WorkoutExerciseItem;
