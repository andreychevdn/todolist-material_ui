import React, { useContext } from "react";
import cls from "./PopupForm.module.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { TodoListContext } from "../../context/todoListContext";
import { AlertContext } from "../../context/alert/alertContext";
import {
  CANCEL_NEW_TASK,
  ON_CHANGE_DRAFT,
  NEW_TASK_DRAFT_HANDLER,
  SAVE_CHANGE_TASK,
  SAVE_NEW_TASK,
  CANCEL_CHANGE_TASK,
  url,
} from "../../reducers/todoListReducer";
import { TodoAlert } from "../alert/Alert";
import axios from "axios";

export const PopupForm = ({ name, placeholder }) => {
  const { state, dispatch } = useContext(TodoListContext);
  const { alert, showAlert, hideAlert } = useContext(AlertContext);
  const styleTextField = [];
  let { tasks, newTaskDraft, formNewTask, selectedTask } = state;

  const saveNewTask = async () => {
    try {
      if (newTaskDraft) {
        hideAlert();
        const task = {
          text: newTaskDraft,
          draft: "",
          disabled: false,
          isdone: false,
          number: null,
          date: new Date().toJSON(),
          checked: false,
        };
        const res = await axios.post(`${url}/tasks.json`, task);
        if (res.status >= 400) {
          throw new Error("Something went wrong!");
        }
        const payload = {
          ...task,
          id: res.data.name,
        };
        dispatch({ type: SAVE_NEW_TASK, payload });
      } else {
        showAlert("This field don't should to be empty!", "error");
      }
    } catch (e) {
      showAlert(`httpError: ${e.message}`, "error");
    }
  };

  const saveChangeTask = async (id) => {
    try {
      if (state.tasks[selectedTask].draft) {
        const newTask = {
          ...state.tasks[selectedTask],
          text: state.tasks[selectedTask].draft,
          draft: "",
          disabled: false,
          number: null,
        };
        const res = await axios.put(`${url}/tasks/${id}.json`, newTask);
        if (res.status >= 400) {
          throw new Error("Something went wrong!");
        }
        dispatch({ type: SAVE_CHANGE_TASK, payload: newTask });
      } else {
        showAlert("This field don't should to be empty!", "error");
      }
    } catch (e) {
      showAlert(`httpError: ${e.message}`, "error");
    }
  };

  const cancelNewTask = () => {
    hideAlert();
    dispatch({ type: CANCEL_NEW_TASK });
  };

  const cancelChangeTask = () => {
    hideAlert();
    dispatch({ type: CANCEL_CHANGE_TASK });
  };

  if (tasks && !formNewTask) {
    if (tasks[selectedTask].text === tasks[selectedTask].draft) {
      styleTextField.push(cls.color);
    }
  }

  return (
    <Container maxWidth="xl" className={cls.container}>
      {alert.alertVisible ? <TodoAlert /> : null}
      <Container maxWidth="sm">
        <form onSubmit={(event) => event.preventDefault()}>
          <fieldset className={cls.wrap}>
            <legend>{name === "Add task" ? "ADD TASK" : "CHANGE TASK"}</legend>
            <TextField
              id="outlined-full-width"
              placeholder={placeholder}
              fullWidth
              size="small"
              variant="outlined"
              className={styleTextField.join()}
              onChange={
                formNewTask
                  ? (event) =>
                      dispatch({
                        type: NEW_TASK_DRAFT_HANDLER,
                        value: event.target.value,
                      })
                  : (event) =>
                      dispatch({
                        type: ON_CHANGE_DRAFT,
                        value: event.target.value,
                      })
              }
              value={formNewTask ? newTaskDraft : tasks[selectedTask].draft}
            />
            <Button
              variant="outlined"
              color="primary"
              className={cls.btn}
              onClick={
                formNewTask
                  ? saveNewTask
                  : () => saveChangeTask(state.tasks[selectedTask].id)
              }
            >
              SAVE
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ left: "100px" }}
              className={cls.btn}
              onClick={formNewTask ? cancelNewTask : cancelChangeTask}
            >
              CANCEL
            </Button>
          </fieldset>
        </form>
      </Container>
    </Container>
  );
};
