import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";



export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const valueChange = (event) => {
    return setName(event.target.value);
  }

  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = (event) => {
    setName("");
    setInterviewer(null);
  }
  const cancel = (event) => {
    reset();
    props.onCancel()
  }

  const save = () => {
    props.onSave(name, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
          onSubmit={event => event.preventDefault()}>
          <input
            value={name}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={valueChange}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer} 
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}