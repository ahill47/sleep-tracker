import React, { useState, useEffect } from "react";
//import {Context} from "./context/context"
import { axiosWithAuth } from "../utils/axiosWithAuth";
import SleepEntryCard from "./SleepEntryCard";


const SleepEntryList = (props) => {
  const [sleepentry, setSleepentry] = useState({})
  // const [editing, setEditing] = useState(false);

//Getting data selected id and filling card with info
   const toAxios = (id) => {
    axiosWithAuth()
      .get(`/sleep/id/${id}`)
      .then(res => {
        const sd = res.data;
        setSleepentry(sd)
        console.log('success',sd)
      })
      .catch(err => console.log('Oops', err.respond))
  }

  const toHome = () => {
    props.history.push("/home")
  }

  useEffect(() => {
    const url = props.match.url;  // navigate here
    const id = props.location.pathname.replace(`${url}/`, "")
    if (id !== "") {
      return toAxios(id);
    }
  }, []);

  //Edit
  // const saveEdit = e =>
  // e.preventDefault();
  // axiosWithAuth()
  // .put()
  // .then(res => console.log('Success'))
  // .catch(err => console.log('Oops', err.respond))

  
  return (
    <div className="card-container">
      <SleepEntryCard entry={sleepentry} toHome={toHome} />
    </div>
  )
};
export default SleepEntryList;

