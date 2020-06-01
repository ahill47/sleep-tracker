import React, { Component } from 'react';
import StartSleepEntry from './modals/StartSleepEntry';
import '../styles/GetUserSleepData.scss';

class GetUserSleepData extends Component {
  render() {
    const { data } = this.props.userData;

    return (
      <div>
        {data &&
          data.map((user, i, arr) => {
            if (i < 7) {
              return (
                <div className='sleepData' key={arr[arr.length - 1 - i].id}>
                  <StartSleepEntry
                    user={arr[arr.length - 1 - i]}
                    handleClose={this.props.handleClose}
                  />
                </div>
              );
            }
          })}
        {/* {data &&
          data.map((user) => (
            <div className='sleepData'>
              <StartSleepEntry
                user={user}
                handleClose={this.props.handleClose}
              />
            </div>
          ))} */}
      </div>
    );
  }
}

export default GetUserSleepData;
