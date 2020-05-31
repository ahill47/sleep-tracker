import { Button, Card, FormLabel, Input } from 'material-ui-core';
import React, { useState } from 'react';
import * as yup from 'yup';
import '../../styles/StartSleepEntry.scss';
import { axiosWithAuth } from '../axiosWithAuth';

import 'date-fns';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
  DateTimePicker,
} from '@material-ui/pickers';

const userId = localStorage.getItem('id');
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

const StartSleepEntry = ({ user, handleClose }) => {
  console.log(handleClose, 'you are working');
  console.log('USER IN SLEEP ENTRY', user);
  // Form State
  const [formState, setFormState] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    moodOne: '',
    moodTwo: '',
  });

  const inputChanged = (event) => {
    // event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    // validateChange(event);
    setFormState(newFormData);
  };

  //   const handleDateChange = (date) => {
  //     setFormState(date);
  //   };

  // state for errors
  const [errors, setErrors] = useState({
    date: '',
    time: '',
  });
  //form schema
  // const formSchema = yup.object().shape({
  //     startDate: yup.date().required("Date is a required field"),
  //     time: yup.string().required("Time is a required field"),
  // });

  // // validate changes based on schema
  // const validateChange = (event) => {
  //     yup
  //         .reach(formSchema, event.target.name)
  //         .validate(event.target.value)
  //         .then(() => {
  //             setErrors({
  //                 ...errors,
  //                 [event.target.name]: "",
  //             });
  //         })
  //         .catch((err) => {
  //             setErrors({
  //                 ...errors,
  //                 [event.target.name]: err.errors[0],
  //             });
  //         });
  // };

  const handleDelete = (id) => {
    console.log(id);
    axiosWithAuth()
      .delete(`/sleep/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log('Oops', err));
    window.location.reload();
  };

  console.log(user, 'user');

  const handleEdit = (id) => {
    console.log(formState);
    // const dummy = {
    //     "startDate": "December 10, 2020",
    //     "startTime": "07:15:00",
    //     "endDate": "December 2, 2020",
    //     "endTime": "08:15:00",
    //     "moodOne": "1",
    //     "moodTwo": "3",
    // }

    //     const dummy2 = {
    //         date: "December 21, 2020",
    //         sleepStart: `December 24, 2020 07:15:00`,
    //         sleepEnd: `December 2, 2020 08:15:00`,
    //         duration: 10,
    //         moodBeforeSleep: 1,
    //         moodAfterSleep: 2,
    // }

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
    axiosWithAuth()
      .put(`/sleep/${id}`, sleepData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log('unable to edit sleep', err));
    window.location.reload();
  };

  return (
    <>
      <div
        className='mappedSleepEntry'
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            name='startDate'
            margin='normal'
            id='date-picker-dialog'
            label='Start Date'
            value={user.sleepStart}
            onChange={inputChanged}
            // onChange={handleDateChange}
          />
          {/* <TimePicker
            name='startTime'
            margin='normal'
            id='time-picker'
            label='Start Time'
            value={user.sleepStart}
            onChange={handleDateChange}
          /> */}
          <DateTimePicker
            name='endDate'
            margin='normal'
            id='date-picker-dialog'
            label='End Date'
            value={user.sleepEnd}
            // onChange={handleDateChange}
          />
          {/* <TimePicker
            name='endTime'
            margin='normal'
            id='time-picker'
            label='End Time'
            value={user.sleepEnd}
            onChange={handleDateChange}
          /> */}
        </MuiPickersUtilsProvider>
        {/* <FormLabel htmlFor='startDate'>
          Start date:
          <Input
            name='startDate'
            onChange={inputChanged}
            placeholder='start date'
            defaultValue={user.sleepStart}
          />
        </FormLabel>
        <FormLabel htmlFor="startTime"> End time: 
                    <Input
                        name="startTime"
                        onChange={inputChanged}
                        placeholder="start-time"
                        defaultValue={user.sleepEnd}
                    />
                </FormLabel>
        <FormLabel htmlFor='endDate'>
          {' '}
          End date:
          <Input
            name='endDate'
            onChange={inputChanged}
            defaultValue={user.sleepStart}
            placeholder='end date'
          />
        </FormLabel>
        <FormLabel htmlFor="endTime"> End time
                    <Input
                        name="endTime"
                        onChange={inputChanged}
                        defaultValue={user.sleepEnd}
                        placeholder="end time"
                    />
                </FormLabel> */}
        <button className='deleteBtn' onClick={() => handleDelete(user.id)}>
          Delete
        </button>
        <button className='editBtn' onClick={() => handleEdit(user.id)}>
          {' '}
          Edit
        </button>
      </div>
    </>
  );
};

export default StartSleepEntry;
