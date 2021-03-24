import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const newSpots = (state, appointments) => {
    console.log("State.days: ", state.days);

    let dayID = state.days.filter((item) => {
      return item.name === state.day;
    })[0].id;

    const appointmentsForDay = state.days[dayID - 1].appointments;

    let spots = 0;

    for (let appt of appointmentsForDay) {
      if (appointments[appt].interview === null) {
        spots++;
      }
    }

    const days = state.days.map((day) => {
      if (day.id === dayID) {
        return { ...day, spots }
      }
      return day;
    })

    return days;
  }
  
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
    // setState({
    //   ...state,
    //   appointments
    // });
    const days = newSpots(state, appointments);

    return axios.put(`api/appointments/${id}`, appointment)
    .then((response) => {
      console.log("Added to database: ", response);
      setState({...state, appointments, days });
    })
  }
  
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = newSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`, null)
    .then((response) => {
      console.log("Deleted from database: ", response);
      setState({...state, appointments, days });
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