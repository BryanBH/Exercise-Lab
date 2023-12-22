import React from 'react';

const LoadingCard: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-3 p-2 border-2 rounded-xl max-w-md cursor-pointer shadow-lg hover:shadow-2xl'>
      <div className='relative my-2 px-2 flex items-center justify-center h-[300px] w-[300px] bg-gray-500 animate-pulse'></div>
      <div className='flex justify-center items-center py-2'>
        <h1 className='text-2xl text-center '>Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingCard;
