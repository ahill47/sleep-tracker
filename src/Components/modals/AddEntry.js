import React, { useState, useEffect } from 'react';
import { Button, Card, FormLabel, Input } from 'material-ui-core';
import * as yup from 'yup';
import Axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {axiosWithAuth} from '../axiosWithAuth'

const AddEntry = (props) => {
  const userId = localStorage.getItem("id")
  //   let currentDate = new Date();
  //   let time =
  //     currentDate.getHours() +
  //     ':' +
  //     currentDate.getMinutes() +
  //     ':' +
  //     currentDate.getSeconds();

  let d = new Date();
  let optionsDate = {
    dateStyle: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  let optionsTime = { timeStyle: 'medium', hour12: false };
  let dateString = d.toLocaleString('en-US', optionsDate);
  let timeString = d.toLocaleString('en-US', optionsTime);

  // const time={`${
  //   date.getHours() > 12
  //     ? date.getHours() - 12
  //     : date.getHours()
  // }:${
  //   date.getMinutes() < 10
  //     ? '0' + date.getMinutes()
  //     : date.getMinutes()
  // }`}
  // const date={`${getDay()}, ${getDayOfMonth()}, ${dayOfMonth}, ${year}`}

  // Form State
  const [formState, setFormState] = useState({
    startDate: 'April 22, 2020',
    startTime: '07:15:00',
    endDate: 'April 23, 2020',
    endtime: '08:15:00',
    moodOne: '1',
    moodTwo: '2'
  });
  //   const [moodValue, setMoodValue] = React.useState('1');

  const handleSubmit =(e) => {
    const {startDate, startTime, endDate, endTime, moodOne, moodTwo } = formState
//     const sleepData = {"date": startDate,
//     "sleepStart": `${startDate} ${startTime}`,
//     "sleepEnd": `${endDate} ${endTime}`,
//     "duration": 10,
//     "moodBeforeSleep": moodOne,
//     "moodAfterSleep": moodTwo,
//     "user_id": userId
// }
const sleepData={
  "date": "April 22, 2020",
    "sleepStart": "April 22, 2020 021:15:00",
    "sleepEnd": "April 23, 2020 07:15:00",
    "duration": 10,
    "moodBeforeSleep": 2,
    "moodAfterSleep": 2,
    "user_id": userId
}

    e.preventDefault()
    console.log(formState)
    axiosWithAuth()
    .post(`/sleep/${userId}`, sleepData )
    .then(res => {
    console.log(res)
    })
    .catch(err => console.log('Oops', err))

  }

  const handleMoodChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const inputChanged = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };

  // state for errors
  const [errors, setErrors] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endtime: '',
    moodOne: '',
    moodTwo: ''
  });
  //form schema
  const formSchema = yup.object().shape({
    startDate: yup.date().required('Date is a required field'),
    startTime: yup.string().required('Time is a required field'),
    endDate: yup.date().required('Date is a required field'),
    endTime: yup.string().required('Time is a required field'),
    moodOne: yup.number().required(' First mood is Required'),
    moodTwo: yup.number().required('Second mood is Required'),
  });

  // validate changes based on schema
  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(() => {
        setErrors({
          ...errors,
          [event.target.name]: '',
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  //   const startEntry = () => {
  //     Axios.post('https://sleeptracker4.herokuapp.com/sleep', {});
  //   };

  return (
    <>
      {/* <p>{console.log()}</p> */}
      <Card
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <FormLabel htmlFor='dastartDatete'> Start date: 
          <Input 
            name='startDate'
            onChange={inputChanged}
            defaultValue={formState.startDate}
            placeholder='start date'
          />
        </FormLabel>
        <FormLabel htmlFor='startTime'> Start Time: 
          <Input
            name='startTime'
            onChange={inputChanged}
            defaultValue={formState.startTime}
            placeholder='start time'
          />
        </FormLabel>
        <FormLabel htmlFor='endDate'> End date: 
          <Input 
            name='endDate'
            onChange={inputChanged}
            defaultValue={formState.endDate}
            placeholder='end date'
          />
        </FormLabel>
        <FormLabel htmlFor='endTime'> End Time: 
          <Input
            name='endTime'
            onChange={inputChanged}
            defaultValue={formState.endTime}
            placeholder='end time'
          />
        </FormLabel>
        <br></br>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Mood Before Sleep</FormLabel>
          <RadioGroup
            aria-label='mood'
            name='moodOne'
            value={formState.moodOne}
            onChange={handleMoodChange}>
            <FormControlLabel value='1' control={<Radio />} label='1' />
            <FormControlLabel value='2' control={<Radio />} label='2' />
            <FormControlLabel value='3' control={<Radio />} label='3' />
            <FormControlLabel value='4' control={<Radio />} label='4' />
          </RadioGroup>

          <FormLabel component='legend'>Mood After Sleep</FormLabel>
          <RadioGroup
            aria-label='mood'
            name='moodTwo'
            value={formState.moodTwo}
            onChange={handleMoodChange}>
            <FormControlLabel value='1' control={<Radio />} label='1' />
            <FormControlLabel value='2' control={<Radio />} label='2' />
            <FormControlLabel value='3' control={<Radio />} label='3' />
            <FormControlLabel value='4' control={<Radio />} label='4' />
          </RadioGroup>
          <button onClick={handleSubmit}>add sleep</button>
        </FormControl>
        {/* <FormLabel htmlFor='mood'>
          <Input
            name='mood'
            onChange={inputChanged}
            defaultValue={1}
            placeholder='mood'
          />
        </FormLabel> */}
      </Card>
    </>
  );
};

export default AddEntry;
