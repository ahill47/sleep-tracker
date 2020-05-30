import React, { useState, useEffect } from 'react';
import { Form } from 'formik';
import { axiosWithAuth } from './axiosWithAuth';
// import {Context} from './Context/context'

export const CreateSleepEntry = (props) => {
useEffect(() => {

  const sleepData={
    "date": "April 22, 2020",
      "sleepStart": "April 22, 2020 021:15:00",
      "sleepEnd": "April 23, 2020 07:15:00",
      "duration": 10,
      "moodBeforeSleep": 2,
      "moodAfterSleep": 2,
      "user_id": 1
  }
    axiosWithAuth()
      .get(`/sleep/1`, sleepData)
      .then(res => {
      console.log(res)
      })
      .catch(err => console.log('Oops', err))

})
  
  // useEffect(() => {
  //   const url = props.match.url;  //  "/CreateSleepEntry"
  //   const id = props.location.pathname.replace(`${url}/`, "")
  //   if (id !== "") {
  //     return toAxios(id);
  //   }
  // }, []);

  
  

  return (
    <>
     
    </>
  );
};

export default CreateSleepEntry;
