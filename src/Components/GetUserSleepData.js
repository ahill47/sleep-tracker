import React, { Component } from "react";
import { Card } from "material-ui-core";
import StartSleepEntry from "./modals/StartSleepEntry";
import '../styles/GetUserSleepData.scss'

class GetUserSleepData extends Component {
   
    render () {
        const {data} = this.props.userData
        return (
            <div>
                {data && data.map((user) => (
                    <div className="sleepData">
                     <StartSleepEntry user={user} handleClose={this.props.handleClose} /> 
                    </div>
                ))}
            </div>
        );
    }
}
 
export default GetUserSleepData;