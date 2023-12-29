import React, { useState } from 'react';
import { useGetUserSavedExercises } from '../hooks';
import { Flash, NewWorkoutCard, WorkoutExerciseItem } from '../components';
import { WorkoutExercises, savedExercises, FlashMessageType } from '../types';

const NewWorkoutPage: React.FC = () => {
  const exercises = useGetUserSavedExercises();

  const [workoutExercises, setworkoutExercises] = useState<WorkoutExercises[]>(
    []
  );
  const [toggleFlash, settoggleFlash] = useState(false);
  const [flashMessage, setflashMessage] = useState<FlashMessageType>({
    message: '',
    type: 'success',
  });

  const addToWorkout = (
    exercise: savedExercises,
    reps: string,
    sets: string
  ) => {
    const Reps = Number(reps);
    const Sets = Number(sets);
    const newItem = {
      name: exercise.name,
      reps: Reps,
      sets: Sets,
      exerciseId: exercise.exerciseId,
      _id: exercise._id,
    };
    setworkoutExercises((prevArray) => [...prevArray, newItem]);
  };

  const deleteFromWorkout = (indexToRemove: number) => {
    const filteredList = workoutExercises.filter(
      (_, index) => index !== indexToRemove
    );
    setworkoutExercises(filteredList);
  };
  const exerciseItems = exercises.map((exercise) => {
    return (
      <WorkoutExerciseItem
        key={exercise.name}
        exercise={exercise}
        addToWorkout={addToWorkout}
      />
    );
  });

  return (
    <section className='h-screen flex justify-center items-center flex-col'>
      {toggleFlash && <Flash {...flashMessage} setToggle={settoggleFlash} />}
      <div className='wrapper h-full w-full grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10 my-5'>
        <NewWorkoutCard
          workoutExercises={workoutExercises}
          deleteFromWorkout={deleteFromWorkout}
          setFlashMessage={setflashMessage}
          setToggleFlash={settoggleFlash}
        />
        <div className='w-[350px] h-[400px] md:h-[573px] md:w-[647px] bg-dark dark:bg-extraDark text-light rounded-[45px] shadow-xl text-center overflow-auto'>
          <h1 className='font-bold leading-7 text-2xl mb-3 py-5'>
            My Saved Exercises
          </h1>
          <div className='mb-8'>
            <ul className='flex flex-col gap-5 items-center justify-center overflow-auto '>
              {exerciseItems}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewWorkoutPage;
