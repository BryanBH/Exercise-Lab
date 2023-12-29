import React, { useState } from 'react';
import { UserInfo } from '../types';
import { Link } from 'react-router-dom';
import { FlashMessageType } from '../types';
import axios from 'axios';
import Flash from './Flash';

const SignUp: React.FC = () => {
  const [user, setuser] = useState<UserInfo>({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setloading] = useState(false);
  const [flashToggle, setFlashToggle] = useState(false);
  const [apiMessage, setApiMessage] = useState<FlashMessageType>({
    message: '',
    type: 'success',
    sendTo: null,
  });

  // Handle form input event changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuser({ ...user, [event.target.name]: event.target.value.trim() });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.post('http://localhost:4500/auth/signup', {
        ...user,
      });
      setApiMessage({
        message: data.message,
        type: 'success',
        sendTo: '/login',
      });
      setloading(false);
      setuser({ username: '', email: '', password: '' });
      setFlashToggle(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { message } = error.response.data;
      setApiMessage({ message: message, type: 'error', sendTo: null });
      setloading(false);
      setFlashToggle(true);
    }
  };

  const buttonLayout = loading ? (
    <button type='button' className='bg-secondary w-[80%] py-1' disabled>
      <div
        className='animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full'
        role='status'
        aria-label='loading'>
        <span className='sr-only'>Loading...</span>
      </div>
    </button>
  ) : (
    <>
      <button
        type='button'
        className='py-3 px-4 bg-secondary text-white rounded-lg hover:shadow'>
        <Link to='/login'>Cancel</Link>
      </button>
      <button
        type='submit'
        className='py-3 px-4 bg-secondary text-white rounded-lg hover:shadow'>
        Create
      </button>
    </>
  );

  return (
    <section className='w-full h-screen flex flex-col text-center gap-4'>
      {flashToggle && (
        <Flash
          message={apiMessage.message}
          type={apiMessage.type}
          sendTo={apiMessage.sendTo}
          setToggle={setFlashToggle}
        />
      )}
      <div className='h-full flex flex-col justify-center items-center text-center  '>
        <div className='form-wrapper bg-tertiary text-light p-3 my-5 rounded-xl shadow-xl w-[350px] md:w-[455px] md:h-[520px] '>
          <h1 className='text-3xl my-3 '>Sign Up </h1>
          <form
            action=''
            className='flex flex-col justify-center items-center gap-5'
            onSubmit={handleSubmit}>
            <div className='input-group flex flex-col w-4/5'>
              <label
                htmlFor='username'
                className='block text-lg font-medium leading-6 text-start mb-3'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                autoComplete='username'
                className='shadow border rounded px-2 focus:outline-none focus:shadow-outline text-dark'
                pattern='/^[0-9A-Za-z]{6,16}$/'
                value={user.username}
                onChange={handleChange}
              />
              <p className='w-full text-xs text-start pt-1'>
                <span className='font-light text-extraDark'>
                  Username contain only letters and numbers, and it must be
                  between 6 and 16 characters long.
                </span>
              </p>
            </div>
            <div className='input-group flex flex-col w-4/5'>
              <label
                htmlFor='email'
                className='block text-lg font-medium leading-6 text-start mb-3'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                autoComplete='email'
                className='shadow border rounded px-2 focus:outline-none focus:shadow-outline text-dark'
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className='input-group flex flex-col w-4/5'>
              <label
                htmlFor='password'
                className='block text-lg font-medium leading-6 text-start mb-3'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                autoComplete='password'
                className='shadow border rounded px-2 focus:outline-none focus:shadow-outline text-dark'
                pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
                '
                value={user.password}
                onChange={handleChange}
              />
              <p className='w-full text-xs text-start py-2'>
                <span className='font-light'>
                  <ul className='text-extraDark'>
                    <li>
                      At least one alphabetic character (uppercase or
                      lowercase).
                    </li>
                    <li>Atleast one digit.</li>
                    <li>
                      At least one special character from the set @$!%*?&.
                    </li>
                    <li>Minimum length of 8 characters.</li>
                  </ul>
                </span>
              </p>
            </div>
            <div className='w-full my-3 flex gap-3 justify-evenly '>
              {buttonLayout}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
