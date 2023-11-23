import React from 'react';
import { skeletonProfileIcon, editPencil } from '../assets';
import { UserProfileInformation } from '../types';

const UserDetails: React.FC<UserProfileInformation> = ({
  username,
  email,
  savedExercises,
}) => {
  const handleClick = () => {
    // TODO Implement updating profile picture feature
  };

  return (
    <section className='w-full'>
      <div className='profile-details flex flex-col md:flex-row bg-[#F8F4F4] w-[90%] mx-auto rounded-lg shadow-2xl mt-5 pb-5'>
        <div className='w-full  md:w-1/2 flex flex-col justify-center items-center mb-5'>
          <div className='relative'>
            <img
              src={skeletonProfileIcon}
              alt='profile image'
              className='rounded-[65px] w-[300px] h-[295px] md:w-[580px] md:h-[550px] mb-10 p-5'
            />

            <div
              className='flex justify-center items-center bg-secondary rounded-full absolute w-12 h-12 bottom-10 right-3 cursor-pointer'
              onClick={handleClick}>
              <img src={editPencil} alt='edit icon' className='w-9 h-9' />
            </div>
          </div>
          <h1 className='font-bold leading-7 text-3xl mb-3'>{username}</h1>
          <h2 className='text-2xl'>{email}</h2>
        </div>
        <div className='w-full md:w-1/2'>
          <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 py-5'>
            <div className='bg-[#F8F4F4] h-[250px] w-[220px] py-5 flex flex-col justify-around items-center rounded-xl shadow-xl'>
              <h3 className='text-2xl mt-5'>Exercises Saved</h3>
              <p className='text-lg'>{savedExercises.length}</p>
            </div>
            <div className='bg-[#F8F4F4] h-[250px] w-[220px] py-5 flex flex-col justify-around items-center rounded-xl shadow-xl'>
              <h3 className='text-2xl mt-5'>Exercises Saved</h3>
              <p className='text-lg'>{savedExercises.length}</p>
            </div>
            <div className='bg-[#F8F4F4] h-[250px] w-[220px] py-5 flex flex-col justify-around items-center rounded-xl shadow-xl'>
              <h3 className='text-2xl mt-5'>Exercises Saved</h3>
              <p className='text-lg'>{savedExercises.length}</p>
            </div>
            <div className='bg-[#F8F4F4] h-[250px] w-[220px] py-5 flex flex-col justify-around items-center rounded-xl shadow-xl'>
              <h3 className='text-2xl mt-5'>Exercises Saved</h3>
              <p className='text-lg'>{savedExercises.length}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
