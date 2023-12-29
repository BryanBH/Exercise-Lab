import React from 'react';
import { styles } from '../styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetAccessToken } from '../hooks';
import { navLinks } from '../data';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
  const token = useGetAccessToken();
  const navigate = useNavigate();
  const navItems = navLinks.map((link) => {
    return (
      <li key={link.id} className='text-[18px] cursor-pointer'>
        <NavLink
          className={({ isActive }) => (isActive ? 'font-bold' : '')}
          to={link.id}>
          {link.title}
        </NavLink>
      </li>
    );
  });

  const isTokenMenu = token ? (
    <>
      <li>
        <NavLink
          to='/profile'
          className={({ isActive }) => (isActive ? 'font-bold' : '')}>
          Profile
        </NavLink>
      </li>
      <li>
        <button
          onClick={() => {
            Cookies.remove('accessToken');
            navigate('/');
            window.location.reload();
          }}>
          Sign Out
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink
          to='sign-up'
          className={({ isActive }) => (isActive ? 'font-bold' : '')}>
          Sign up
        </NavLink>
      </li>
      <li>
        <NavLink
          to='login'
          className={({ isActive }) => (isActive ? 'font-bold' : '')}>
          Login
        </NavLink>
      </li>
    </>
  );
  const navMenu = (
    <>
      <ul className='list-none hidden sm:flex flex-row gap-10 justify-center items-center '>
        {navItems}
      </ul>
      <ul className='ms-auto flex gap-10'>{isTokenMenu}</ul>
    </>
  );
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 sticky top-0 z-10 bg-dark text-light dark:bg-extraDark`}>
      <div className='w-full flex justify-start items-center max-w-7xl mx-auto'>
        <NavLink to='/' className='flex items-center gap-10 me-5'>
          <p>Exercise Lab</p>
        </NavLink>
        {navMenu}
      </div>
    </nav>
  );
};

export default Navbar;
