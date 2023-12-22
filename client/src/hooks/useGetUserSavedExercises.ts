import { useEffect, useState } from 'react';
import { useGetAccessToken } from '.';
import { savedExercises } from '../types';
import axios from 'axios';

export const useGetUserSavedExercises = () => {
  const token = useGetAccessToken();
  const [exercises, setexercises] = useState<[savedExercises]>([
    { _id: '', name: '', user: '', exerciseId: '' },
  ]);
  useEffect(() => {
    const getSavedExercises = async () => {
      if (token) {
        try {
          const { data } = await axios.get(
            'http://localhost:4500/auth/getSavedExercises',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setexercises(data.savedExercises);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getSavedExercises();
  }, [token]);

  return exercises;
};
