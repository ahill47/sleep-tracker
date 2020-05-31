import React, { useState, useEffect } from 'react';
import SleepGraph from './SleepGraph';
import GetUserSleepData from './GetUserSleepData';
import AddEntry from './modals/AddEntry';
import '../styles/Dashboard.scss';
import NavBar from './NavBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { axiosWithAuth } from './axiosWithAuth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const date = new Date();
const dayOfMonth = date.getDate();
const weekDay = date.getDay();
const year = date.getFullYear();
const month = date.getMonth();
function getDay() {
  switch (weekDay) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return weekDay;
  }
}

function getDayOfMonth() {
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return month;
  }
}

const Dashboard = () => {
  const userId = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const username = localStorage.getItem('userName');
  const alertMessage = localStorage.getItem('message');

  useEffect(() => {
    setSnackOpen(true);
    axiosWithAuth()
      .get(`/sleep/${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [open]);

  const entryDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <div>
      <NavBar />
      <h1>Dashboard</h1>
      <div className='dash'>
        <div className='left'>
          <SleepGraph />
          <Button
            className='entryBtn'
            variant='outlined'
            onClick={entryDialogOpen}>
            Add Entry
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'>
            <DialogTitle id='alert-dialog-slide-title'>
              {'Going to sleep?'}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText id='alert-dialog-slide-description'> */}
              <AddEntry handleClose={handleClose} />
              {/* </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose} color='primary'>
                Cancel
              </Button> */}
              <Button onClick={handleClose} color='primary'>
                Complete
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity='success'>
              {alertMessage}!
            </Alert>
          </Snackbar>
        </div>
        <div className='right'>
          <GetUserSleepData userData={data} handleClose={entryDialogOpen} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
