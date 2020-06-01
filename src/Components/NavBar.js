import React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/NavBar.scss';

export default function NavBar() {
  const [user, setUser] = useState({});
  const toMarketing = (e) => {
    e.preventDefault();
    window.open(
      'https://suspicious-raman-8d3deb.netlify.app/index.html',
      '_blank'
    );
  };

  const username = localStorage.getItem('message');
  return (
    <div className='nav'>
      <p> SleepTracker</p>

      <br></br>
      <div className='navLinks'>
        {/* <Link
          to
          style={{ color: 'rgb(205, 205, 205)', margin: '3%' }}
          onClick={toMarketing}>
          Home
        </Link> */}
        <a
          className='links'
          href='https://suspicious-raman-8d3deb.netlify.app/index.html'>
          Home
        </a>
        <NavLink to='/dashboard' className='links'>
          DashBoard
        </NavLink>

        <NavLink to='/image' className='links'>
          Tips
        </NavLink>

        <NavLink to='/signin' className='links'>
          Logout
        </NavLink>
      </div>
    </div>
  );
}
