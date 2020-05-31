import React, { useState, useEffect } from 'react';
import { Button, Card, FormLabel, Input } from 'material-ui-core';
import * as yup from 'yup';
import Axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { axiosWithAuth } from '../axiosWithAuth';
import 'date-fns';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';

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
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  // Form State
  const [formState, setFormState] = useState({
    startDate: new Date(),
    startTime: new Date(),
    endDate: tomorrow,
    endTime: tomorrow,
    moodOne: '1',
    moodTwo: '1',
  });
  const [data, setData] = useState([]);

  // const handleDateChange = (date) => {
  //   setFormState({...formState});
  // };

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
      sleepStart: `${startDate}`,
      sleepEnd: `${endDate}`,
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
    // props.handleClose();
  };

  const handleMoodChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  // const inputChanged = (event) => {
  //   // event.persist();
  //   const newFormData = {
  //     ...formState,
  //     [event.target.name]: event.target.value,
  //   };
  //   validateChange(event);
  //   setFormState(newFormData);
  // };

  const startDateChanged = (date) => {
    setFormState({
      ...formState,
      startDate: date,
    });
  };

  const startTimeChanged = (date) => {
    setFormState({
      ...formState,
      startTime: date,
    });
  };

  const endDateChanged = (date) => {
    setFormState({
      ...formState,
      endDate: date,
    });
  };

  const endTimeChanged = (date) => {
    setFormState({
      ...formState,
      endTime: date,
    });
  };

  // state for errors
  const [errors, setErrors] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            name='startDate'
            margin='normal'
            id='date-picker-dialog'
            label='Start Date'
            value={formState.startDate}
            onChange={startDateChanged}
          />
          <TimePicker
            name='startTime'
            margin='normal'
            id='time-picker'
            label='Start Time'
            value={formState.startTime}
            onChange={startTimeChanged}
          />
          <DatePicker
            name='endDate'
            margin='normal'
            id='date-picker-dialog'
            label='End Date'
            value={formState.endDate}
            onChange={endDateChanged}
          />
          <TimePicker
            name='endTime'
            margin='normal'
            id='time-picker'
            label='End Time'
            value={formState.endTime}
            onChange={endTimeChanged}
          />
        </MuiPickersUtilsProvider>
        {/* <FormLabel htmlFor='dastartDate'>
          Start date:
          <Input
            name='startDate'
            onChange={inputChanged}
            defaultValue={formState.startDate}
            placeholder='start date'
          />
        </FormLabel>
        <FormLabel htmlFor='startTime'>
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
          End Time:
          <Input
            name='endTime'
            onChange={inputChanged}
            defaultValue={formState.endTime}
            placeholder='end time'
          />
        </FormLabel> */}
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
