import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default function Signin(props) {
  const [logInData, setLogInData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post('https://sleeptracker4.herokuapp.com/auth/login', logInData)
      .then((res) => {
        // console.log('res: ', res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('message', res.data.message);
        const resConfig = JSON.parse(res.config.data);
        localStorage.setItem('userName', resConfig.username);
        setIsLoading(false);
        props.history.push('/dashboard');
      })
      .catch((err) => console.log('Log In Error: ', err));
  };

  const handleChanges = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading === true) {
    return (
      <div className='loaderDiv'>
        {/* <h1>Loading...</h1> */}
        <Loader
          className='loader'
          type='ThreeDots'
          color='#00BFFF'
          timeout={10000}
        />
        loading.....
      </div>
    );
  } else {
    return (
      <div className='signinContainer negative-top-margin-adjustment'>
        <div>
          <div>
            <h1 style={{ marginTop: '9rem' }}>Sign in</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username'>Username: </label>
              <input
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                placeholder='Username'
                autoFocus
                onChange={handleChanges}
              />
              <br />
              <label htmlFor='password'>Password: </label>
              <input
                name='password'
                label='Password'
                type='password'
                id='password'
                placeholder='Password'
                autoComplete='current-password'
                onChange={handleChanges}
              />
            </div>
            <button className='blueButton' type='submit'>
              Sign In
            </button>
            <div>
              <div>
                <Link style={{ color: 'white' }} to={`/forgot-password`}>
                  Forgot password?
                </Link>
              </div>
              <div>
                <Link style={{ color: 'white' }} to={`/register`}>
                  New to Sleep Tracker?{' '}
                  <span style={{ color: '#39869D' }}>Sign Up</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
