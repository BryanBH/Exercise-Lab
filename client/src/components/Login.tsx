import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Flash from './Flash';
import { useNavigate } from 'react-router-dom';

interface loginInfo {
  username: string;
  password: string;
}

interface apiMessageType {
  message: string;
  type: string;
  sendTo?: string | null;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState<loginInfo>({
    username: '',
    password: '',
  });
  const [flashToggle, setFlashToggle] = useState(false);
  const [apiMessage, setApiMessage] = useState<apiMessageType>({
    message: '',
    type: '',
    sendTo: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuserInfo({
      ...userInfo,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4500/auth/signin', {
        ...userInfo,
      });
      // set token in cookies which expires in two days
      Cookies.set('accessToken', data.accessToken, { expires: 2 });
      navigate('/profile');
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { message } = error.response.data;
      setFlashToggle(true);
      setApiMessage({ message: message, type: 'error', sendTo: null });
    }
  };

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
        <div className='form-wrapper bg-tertiary p-3 my-5 rounded-xl shadow-xl w-[316px] h-[400px] md:w-[455px] md:h-[400px] text-light'>
          <h1 className='text-3xl my-3'>Login</h1>
          <form
            action=''
            className='flex flex-col justify-evenly items-center gap-5'
            onSubmit={handleSubmit}>
            <div className='input-group flex flex-col w-4/5 mb-3'>
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
                className='rounded-sm px-2 text-dark'
                value={userInfo.username}
                onChange={handleChange}
              />
            </div>
            <div className='input-group flex flex-col w-4/5 mb-3'>
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
                className='rounded-sm px-2 text-dark'
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>
            <div className='w-full my-3 flex gap-3 justify-evenly mt-3'>
              <button
                type='button'
                className='py-3 px-4 bg-secondary text-white rounded-lg'>
                <Link to='/'>Cancel</Link>
              </button>
              <button
                type='submit'
                className='py-3 px-4 bg-secondary text-white rounded-lg'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
