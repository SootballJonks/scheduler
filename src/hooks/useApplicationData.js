import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  
  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`api/appointments/${id}`, appointment)
    .then((response) => {
      console.log("Added to database: ", response);
    })
  }
  
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`, null)
    .then((response) => {
      console.log("Deleted from database: ", response);
    })
  }
  
  const setDay = (day) => {
    return setState((prev) => ({ ...prev, day }));
  }
  
  
  useEffect(() => {
    
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then(response => {
      
      setState((prev) => ({
        ...prev, 
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview };

}