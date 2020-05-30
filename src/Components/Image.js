import React from "react";
import Button from "./Button";
import { ThemeContextConsumer } from '../context/themeContext'
import NavBar from './NavBar';
import "./style.css";

function Image(props) {
  return ( 
<div>
  <NavBar/>
  
    <ThemeContextConsumer>
       
      {context => (
        <div className={`${context.theme}-image image`} >
          <div className={`${context.theme}-ball ball`} />
          <h1> Tips to Sleep Better</h1>
          <ul class='removeBullets'>
                  <li>1. Increase bright light exposure during the day</li>
                  <li>2. Reduce blue light exposure in the evening</li>
                  <li>3. Don’t consume caffeine late in the day</li>
                  <li>4. Reduce irregular or long daytime naps</li>
                  <li>5. Try to sleep and wake at consistent times</li>
                  <li>6. Take a melatonin supplement</li>
                  <li>8. Don’t drink alcoho</li>
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
