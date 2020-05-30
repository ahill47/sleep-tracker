import { Button, Card, FormLabel, Input } from "material-ui-core";
import React, { useState } from "react";
import * as yup from "yup";
import '../../styles/StartSleepEntry.scss'

const StartSleepEntry = (props) => {
    // Form State
    const [formState, setFormState] = useState({
        date: "",
        time: "",
        mood: {
            terrible: 0,
            bad: 1,
            good: 2,
            great: 3,
        },
    });

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
        date: "",
        time: "",
    });
    //form schema
    const formSchema = yup.object().shape({
        date: yup.date().required("Date is a required field"),
        time: yup.string().required("Time is a required field"),
    });

    // validate changes based on schema
    const validateChange = (event) => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(() => {
                setErrors({
                    ...errors,
                    [event.target.name]: "",
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
            <div
                className="mappedSleepEntry"
                style={{
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                }}
            >
                <FormLabel htmlFor="edit-entry">
                    <Input
                        name="edit-entry"
                        onChange={inputChanged}
                        placeholder="Edit Entry"
                    />
                </FormLabel>
                <FormLabel htmlFor="date">
                    <Input
                        name="date"
                        onChange={inputChanged}
                        defaultValue={props.date}
                        placeholder="date"
                    />
                </FormLabel>
                <FormLabel htmlFor="time">
                    <Input
                        name="time"
                        onChange={inputChanged}
                        defaultValue={props.time}
                        placeholder="time"
                    />
                </FormLabel>
                <button className="deleteBtn">Delete</button>
            </div>
        </>
    );
};

export default StartSleepEntry;