import React from "react";
import SleepImage from '../styles/Sleep_Image.png';
import Footer from './Footer'



const WelcomePage = props => {
  return (
    // <div className="negative-top-margin-adjustment">
      <div className="welcomePageContainer">
        <div>
          <h1 style={{ marginTop:'60%'}} className="textDiv">Sleep Tracker</h1>
          {/* <h2 style={{ fontSize: "20px" }}>Perfect Sleep Tracker</h2> */}
          <img style={{marginTop:'-7.5%', marginLeft:'5%'}} src={SleepImage} alt='weblogo' className='logoImg'/>
        </div>
        <button
          className="blackButton"
          onClick={() => props.history.push("/register")}
        >
          Sign Up
        </button>
        <button
          className="blueButton"
          onClick={() => props.history.push("/signin")}
        >
          Sign In
        </button>
        <br />
        <div className="welcomepage-socialmedia-container">

        </div> 
        <Footer/>
      </div>
     
    // </div>
  );
};
export default WelcomePage;
