import React from 'react';
import Button from './Button';
import { ThemeContextConsumer } from '../context/themeContext';
import NavBar from './NavBar';
import './style.css';

function Image(props) {
  return (
    <div>
      <NavBar />

      <ThemeContextConsumer>
        {(context) => (
          <div className={`${context.theme}-image image`}>
            <div className={`${context.theme}-ball ball`} />
            <h1> Tips to Sleep Better</h1>
            <ul className='removeBullets'>
              <li>
                1. Increase bright light exposure during the day{' '}
                <span role='img' aria-label='sun'>
                  🌞
                </span>
              </li>
              <li>
                2. Reduce blue light exposure in the evening{' '}
                <span role='img' aria-label='moon'>
                  🌑
                </span>
              </li>
              <li>
                3. Don’t consume caffeine late in the day{' '}
                <span role='img' aria-label='coffee'>
                  ☕
                </span>
              </li>
              <li>
                4. Reduce irregular or long daytime naps{' '}
                <span role='img' aria-label='zzz'>
                  💤
                </span>
              </li>
              <li>
                5. Try to sleep and wake at consistent times{' '}
                <span role='img' aria-label='alarm'>
                  ⏰
                </span>
              </li>
              <li>
                6. Take a melatonin supplement{' '}
                <span role='img' aria-label='pills'>
                  💊
                </span>
              </li>
              <li>
                8. Don’t drink alcohol{' '}
                <span role='img' aria-label='tini'>
                  🍸
                </span>
              </li>
            </ul>
            <Button />
          </div>
        )}
      </ThemeContextConsumer>
    </div>
  );
}

Image.contextType = ThemeContextConsumer;

export default Image;
