import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WorkoutVideoResponse } from '../types';

interface WorkoutVideosProps {
  exerciseName: string;
}

const WorkoutVideos: React.FC<WorkoutVideosProps> = ({ exerciseName }) => {
  const [videos, setvideos] = useState<WorkoutVideoResponse[] | null>();

  useEffect(() => {
    const getExerciseVideos = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4500/exercises/getVideos',
          { params: { exerciseName } }
        );
        setvideos(data);
      } catch (error) {
        console.log(error);
      }
    };

    getExerciseVideos();
  }, [exerciseName]);

  const items = videos?.map((item) => {
    return (
      <div key={item.videoId}>
        <iframe
          src={`https://www.youtube.com/embed/${item.videoId}?enablejsapi=1`}
          width='350'
          height='350'
          title={item.title}></iframe>
      </div>
    );
  });

  return (
    <>
      {videos && (
        <div className='w-full h-full flex flex-col'>
          <h2 className='font-bold text-2xl text-center mb-3'>
            {exerciseName} Videos
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 place-items-center mb-5 gap-5'>
            {/* <div className='bg-gray-500 w-[350px] h-[350px] text-center'>test</div>
      <div className='bg-gray-500 w-[350px] h-[350px] text-center'>test</div>
      <div className='bg-gray-500 w-[350px] h-[350px] text-center'>test</div> */}
            {items}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutVideos;
