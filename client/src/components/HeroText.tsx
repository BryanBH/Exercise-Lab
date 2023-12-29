import React from 'react';
import { Link } from 'react-router-dom';

const HeroText: React.FC = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center my-3'>
      <div className='flex flex-col items-start gap-5'>
        <h1 className='text-3xl text-secondary dark:text-light'>Better You</h1>
        <h2 className='text-3xl font-bold text-dark dark:text-light'>Sweat, Smile and Repeat</h2>
        <p className='text-dark dark:text-light'>Look for new exercises to add to your workout plan</p>
        <div className='flex sm:flex-row flex-col justify-start gap-5 w-full mt-3'>
          <button className='rounded-full p-3 text-white bg-dark dark:bg-secondary cursor-pointer'>
            <Link to='/exercises'>Explore exercises</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
