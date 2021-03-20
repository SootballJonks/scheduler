import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "./Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY 
  );

  const onAdd = () => {
    transition(CREATE);
  }

  const onCancel = () => {
    back();
  }

  const onDelete = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }

  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDITING)}
          onDelete={() => transition(CONFIRM)}
        />
      )} 
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETING && <Status message="Deleting..."/>}
      {mode === ERROR_SAVE && (
        <Error
          message="Uh-oh! Appointment could not be saved!"
          onClose={onCancel}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Uh-oh! Appointment could not be deleted!"
          onClose={onCancel}
        />
      )}
      {mode === CONFIRM && (
      <Confirm  
        message="Are you sure you want to cancel this appointment?"
        onConfirm={onDelete}
        onCancel={onCancel}
      />
      )}
    </article>
  )
}