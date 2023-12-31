import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useGetAccessToken = (navigateTo?: string) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get('accessToken'));

  useEffect(() => {
    // const accessToken = Cookies.get('accessToken');
    if (!token && navigateTo) {
      navigate(navigateTo);
    } else {
      setToken(Cookies.get('accessToken'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return token;
};

export default useGetAccessToken;
