import React from 'react';

interface WorkoutVideosProps {
  exerciseName: string;
}

const WorkoutVideos: React.FC<WorkoutVideosProps> = ({ exerciseName }) => {
  return (
    <div className='w-full h-full flex flex-col'>
      <h2 className='font-bold text-2xl text-center mb-3'>
        {exerciseName} Videos
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 place-items-center mb-5 gap-5'>
        <div className='bg-gray-500 w-[350px] h-[350px] text-center'>tes</div>
        <div className='bg-gray-500 w-[350px] h-[350px] text-center'>tes</div>
        <div className='bg-gray-500 w-[350px] h-[350px] text-center'>tes</div>
        <div className='bg-gray-500 w-[350px] h-[350px] text-center'>tes</div>
      </div>
    </div>
  );
};

export default WorkoutVideos;
