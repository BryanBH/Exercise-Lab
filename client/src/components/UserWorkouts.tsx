import React from 'react';

const UserWorkouts: React.FC = () => {
  return (
    <div className='w-[350px] h-[400px] md:h-[573px] md:w-[647px] bg-[#F8F4F4] rounded-[45px] shadow-xl text-center overflow-auto pb-5 relative'>
      <div className='flex justify-center items-center relative'>
        <h1 className='font-bold leading-7 text-2xl mb-3 py-5 '>My Workouts</h1>
        <button className='absolute top-5 right-8 bg-secondary w-8 h-8 rounded-full text-white text-3xl flex justify-center items-end'>
          +
        </button>
      </div>
      <div>
        <ul className='flex flex-col gap-5 items-center justify-center overflow-hidden'>
          {/* TODO style scrollbar  */}
          <li className='bg-secondary w-[90%] h-10 flex items-center justify-evenly rounded-lg'>
            <h4 className='font-bold leading-5 text-xl py-2 text-white'>
              Chest Pumpy
            </h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserWorkouts;
