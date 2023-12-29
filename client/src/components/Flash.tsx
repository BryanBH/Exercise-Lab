import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: string;
  message: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
  sendTo?: string | null;
}

const Flash: React.FC<Props> = ({ type, message, setToggle, sendTo }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setToggle(false);
  };

  useEffect(() => {
    let time: string | number | NodeJS.Timeout | undefined;
    if (sendTo) {
      time = setTimeout(() => {
        navigate(sendTo);
      }, 3000);
    } else {
      time = setTimeout(() => {
        handleClick();
      }, 3000);
    }

    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendTo]);

  return (
    <div
      className={`w-full h-10 flex justify-center items-center ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}>
      <div className='mx-auto'>{message}</div>
      <div className=''>
        <button
          className='w-5 h-5 bg-tertiary text-light mr-3 rounded-full flex justify-center items-center'
          onClick={handleClick}>
          X
        </button>
      </div>
    </div>
  );
};

export default Flash;
