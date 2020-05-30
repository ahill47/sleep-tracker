import React, { Component } from "react";
import { Card } from "material-ui-core";
import StartSleepEntry from "./modals/StartSleepEntry";
import '../styles/GetUserSleepData.scss'

class GetUserSleepData extends Component {
    render () {
        return (
            <div>
                {this.props.userData.map((user) => (
                    <div className="sleepData">
                        <StartSleepEntry />
                    </div>
                ))}
            </div>
        );
    }
}

export default GetUserSleepData;