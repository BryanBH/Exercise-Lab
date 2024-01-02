import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetAccessToken } from '../hooks';
import { UserProfileInformation } from '../types';
import { UserDetails, UserWorkouts, UserExercises } from '../components';

const ProfilePage: React.FC = () => {
  const [user, setuser] = useState<UserProfileInformation>({
    username: '',
    email: '',
    savedExercises: [],
    savedWorkouts: [],
    _id: '',
    profileImage: { url: '', filename: '' },
  });
  const token = useGetAccessToken('/login');

  useEffect(() => {
    const getUserProfileInformation = async () => {
      if (token) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/auth/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setuser({ ...data });
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserProfileInformation();
  }, [token]);

  return (
    <>
      <UserDetails {...user} />
      <section className='w-full mt-5 grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10 py-5 '>
        <UserWorkouts />
        <UserExercises />
      </section>
    </>
  );
};

export default ProfilePage;
