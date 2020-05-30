import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// import MainPage from "./components/MainPage";
import WelcomePage from './Components/WelcomePage';
import Register from './Authentication/Register';
import Signin from './Authentication/Signin';
import ForgotPassword from './Authentication/ForgotPassword';
import Signout from './Authentication/Signout';
import Dashboard from './Components/Dashboard';
import CreateSleepEntry from './Components/CreateSleepEntry'
import Image from './Components/Image';

import "./App.css";


function App () {
  return (
    <div className="App">
      <BrowserRouter basename="Front-End">
        <Route exact path="/" component={WelcomePage} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/signout" component={Signout} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />

         <PrivateRoute exact path="/image" component={Image} />
        

        {/* <PrivateRoute path="/my/list" component={ListItem} /> */} 
      </BrowserRouter>
    </div>
  );
}

export default App;
