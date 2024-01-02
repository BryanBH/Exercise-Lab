import React, { useState } from 'react';
import axios from 'axios';
import { useGetAccessToken } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { Flash } from '../components';
import { FlashMessageType } from '../types';

const ProfilePictureUpload: React.FC = () => {
  const token = useGetAccessToken();
  const navigate = useNavigate();
  const [imageFile, setimageFile] = useState<File | null>(null);
  const [toggleFlash, setToggleFlash] = useState(false);
  const [flashMessage, setflashMessage] = useState<FlashMessageType>({
    message: '',
    type: 'success',
    sendTo: '',
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setimageFile(file);
    }
  };

  const submitImage = async (event: React.FormEvent) => {
    event.preventDefault();
    // setloading(true);
    if (imageFile && token) {
      try {
        // create form data for the image
        const formData = new FormData();
        // append image file to form data
        formData.append('image', imageFile);
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/auth/uploadProfilePic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setToggleFlash(true);
        setflashMessage({
          type: 'success',
          message: data.message,
          sendTo: '/profile',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        setToggleFlash(true);
        setflashMessage({ type: 'error', message: error.message });
      }
    }
  };

  return (
    <div
      className='fixed top-0 right-0 left-0 bottom-0 z-50 flex w-full h-[100%] bg-light dark:bg-dark text-light'
      onClick={() => navigate('/profile')}>
      {toggleFlash && (
        <div className='fixed top-0 right-0 left-0 bottom-0 z-100'>
          <Flash {...flashMessage} setToggle={setToggleFlash} />
        </div>
      )}
      <section
        className=' relative modal m-auto w-[90%] max-w-[40rem] p-5 rounded-lg flex justify-center items-center flex-col sm:flex-row flex-wrap  bg-dark dark:bg-extraDark'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <form encType='multipart/form-data' onSubmit={submitImage}>
          <div className='w-full text-center font-bold mb-3'>
            <label
              className='block mb-2 text-xl font-medium'
              htmlFor='file_input'>
              Upload file
            </label>
          </div>
          <div className='flex justify-center items-center gap-4 text-center'>
            <input
              className='flex w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
              aria-describedby='file_input_help'
              id='file_input'
              type='file'
              multiple={false}
              required
              onChange={handleFileUpload}
            />
            <button
              type='submit'
              className='bg-tertiary text-white p-1 rounded-lg'>
              Upload
            </button>
          </div>
        </form>
        <button
          className='bg-tertiary w-8 h-8 text-white rounded-full absolute top-0 right-0 '
          onClick={() => navigate('/profile')}>
          X
        </button>
      </section>
    </div>
  );
};

export default ProfilePictureUpload;
