import React, { useState, useEffect } from 'react';
import { Button, Card, FormLabel, Input } from 'material-ui-core';
import * as yup from 'yup';
import Axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { axiosWithAuth } from '../axiosWithAuth';

const AddEntry = (props) => {
  const userId = localStorage.getItem('id');

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

  // Form State
  const [formState, setFormState] = useState({
    startDate: 'December 4, 2020',
    startTime: '07:15:00',
    endDate: 'December 3, 2020',
    endTime: '08:15:00',
    moodOne: '1',
    moodTwo: '2',
  });
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    const {
      startDate,
      startTime,
      endDate,
      endTime,
      moodOne,
      moodTwo,
    } = formState;
    const sleepData = {
      date: startDate,
      sleepStart: `${startDate} ${startTime}`,
      sleepEnd: `${endDate} ${endTime}`,
      duration: 10,
      moodBeforeSleep: moodOne,
      moodAfterSleep: moodTwo,
      user_id: userId,
    };
    e.preventDefault();
    console.log(sleepData);
    axiosWithAuth()
      .post(`/sleep`, sleepData)
      .then((res) => {
        console.log(res, 'successfully added');
      })
      .catch((err) => console.log('Oops', err));
    //props.handleClose()
  };

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
    moodTwo: '',
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

  return (
    <>
      <Card
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <FormLabel htmlFor='dastartDatete'>
          {' '}
          Start date:
          <Input
            name='startDate'
            onChange={inputChanged}
            defaultValue={formState.startDate}
            placeholder='start date'
          />
        </FormLabel>
        <FormLabel htmlFor='startTime'>
          {' '}
          Start Time:
          <Input
            name='startTime'
            onChange={inputChanged}
            defaultValue={formState.startTime}
            placeholder='start time'
          />
        </FormLabel>
        <FormLabel htmlFor='endDate'>
          {' '}
          End date:
          <Input
            name='endDate'
            onChange={inputChanged}
            defaultValue={formState.endDate}
            placeholder='end date'
          />
        </FormLabel>
        <FormLabel htmlFor='endTime'>
          {' '}
          End Time:
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
            row
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
            row
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
      </Card>
    </>
  );
};

export default AddEntry;
