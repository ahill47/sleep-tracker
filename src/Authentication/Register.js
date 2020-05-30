import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register (props) {
  const [signUpData, setSignUpData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    console.log(signUpData, "my data")

    axios
      .post("https://sleeptracker4.herokuapp.com/auth/register", signUpData)
      .then(res => {
        console.log("res: ", res);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("message", res.data.message);
        localStorage.setItem("id", res.data.id);
        setIsLoading(false);
       // props.history.push("/signin");
      })
      .catch(err => console.log("Sign Up Error: ", err));
  };

  const handleChanges = e => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading === true) {
    return (
      <>
        <div className="loadingSpinner">Loading...</div>
      </>
    );
  } else {
    return (
      <div className="registerContainer">
        <div>
          <div>
            <h1>Register</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div>
                  <label htmlFor="firstname">First Name: </label>
                  <input
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    autoComplete="fname"
                    onChange={handleChanges}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Last Name: </label>
                  <input
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    autoComplete="lname"
                    onChange={handleChanges}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label htmlFor="username">Username: </label>
                  <input
                    id="username"
                    name="username"
                    label="Username"
                    type="username"
                    autoComplete="username"
                    onChange={handleChanges}
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password">Password: </label>
                  <input
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChanges}
                    placeholder="Password"
                  />
                </div>
                <div className="termsOfServiceDiv">

                </div>
              </div>
            </div>
            <button className="blackButton" type="submit">
              Sign Up
            </button>
            <div>
              <div>
                <Link style={{ color: "white" }} to={`/signin`}>Already have an account? <span style={{ color: '#39869D' }}>Sign in</span></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
