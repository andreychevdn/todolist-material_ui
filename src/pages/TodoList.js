import React, { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import cls from "./todolist.module.css";
import { TodoListContext } from "../context/todoListContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { PopupForm } from "../components/popupForm/PopupForm";
import Loader from "../components/Loader";
import { TodoAlert } from "../components/alert/Alert";
import todoListReducer, {
  HANDLE_TASK_SELECT,
  ON_CLICK_TASK_NOT_DONE,
  HANDLE_POPUP_FORM,
  ON_CLICK_TASK_DELETE,
  ON_CLICK_TASK_DONE,
  ON_CLICK_TASK_CHANGE,
  SHOW_LOADER,
  FETCH_TASKS,
  url,
  HIDE_LOADER,
} from "../reducers/todoListReducer";
import { TextField } from "@material-ui/core";
import { AlertContext } from "../context/alert/alertContext";
import { CheckBox } from "../components/CheckBox";

export const TodoList = () => {
  const [state, dispatch] = useReducer(todoListReducer, {
    tasks: [],
    newTaskDraft: "",
    formMakeList: true,
    formNewTask: false,
    formChangeTask: false,
    selectedTask: null,
    todoCount: 0,
    loading: false,
  });

  const { showAlert, alert } = useContext(AlertContext);

  const showLoader = () => {
    dispatch({ type: SHOW_LOADER });
  };

  const hideLoader = () => {
    dispatch({ type: HIDE_LOADER });
  };

  const fetchTasks = async () => {
    try {
      showLoader();
      const res = await axios.get(`${url}/tasks.json`);
      if (res.status >= 400) {
        throw new Error("Something went wrong!");
      }
      if (res.data) {
        const payload = Object.keys(res.data).map((key) => {
          return {
            ...res.data[key],
            id: key,
          };
        });
        dispatch({ type: FETCH_TASKS, payload });
        hideLoader();
      } else {
        setTimeout(hideLoader, 1500);
        setTimeout(() => {
          showAlert("The database is empty - create a task!", "error");
        }, 1500);
      }
    } catch (e) {
      showAlert(`httpError: ${e.message}`, "error");
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  let {
    tasks,
    formMakeList,
    formNewTask,
    formChangeTask,
    selectedTask,
    todoCount,
    loading,
  } = state;

  const onClickTaskChange = () => {
    if (tasks && selectedTask !== null && tasks[selectedTask].number !== null) {
      dispatch({ type: ON_CLICK_TASK_CHANGE });
    }
  };

  const onClickTaskDone = async (id) => {
    try {
      if (
        tasks.length &&
        selectedTask !== null &&
        tasks[selectedTask].number !== null
      ) {
        const taskDone = {
          ...state.tasks[selectedTask],
          isdone: true,
          checked: true,
          disabled: true,
          number: null,
        };
        const response = await axios.put(`${url}/tasks/${id}.json`, taskDone);
        if (response.status >= 400) {
          throw new Error("Something went wrong!");
        }
        dispatch({
          type: ON_CLICK_TASK_DONE,
          payload: taskDone,
        });
      }
    } catch (e) {
      showAlert(`httpError: ${e.message}`, "error");
    }
  };

  const onClickTaskNotDone = async (id) => {
    try {
      if (
        tasks.length &&
        selectedTask !== null &&
        tasks[selectedTask].number !== null
      ) {
        const taskNotDone = {
          ...state.tasks[selectedTask],
          isdone: false,
          checked: false,
          disabled: false,
          number: null,
        };
        const response = await axios.put(
          `${url}/tasks/${id}.json`,
          taskNotDone
        );
        if (response.status >= 400) {
          throw new Error("Something went wrong!");
        }
        dispatch({
          type: ON_CLICK_TASK_NOT_DONE,
          payload: taskNotDone,
        });
      }
    } catch (e) {
      showAlert(`httpError: ${e.message}`, "error");
    }
  };

  const onClickTaskDelete = async (id) => {
    try {
      if (
        tasks.length &&
        selectedTask !== null &&
        tasks[selectedTask].number !== null
      ) {
        const response = await axios.delete(`${url}/tasks/${id}.json`);
        if (response.status >= 400) {
          throw new Error("Something went wrong!");
        }
        dispatch({ type: ON_CLICK_TASK_DELETE, payload: id });
      }
    } catch (e) {
      showAlert(`httpError: ${e.message}`, "error");
    }
  };

  return (
    <>
      <TodoListContext.Provider value={{ state, dispatch }}>
        {alert.alertVisible ? <TodoAlert /> : null}
        {loading ? (
          <Loader />
        ) : formMakeList ? (
          <Container maxWidth="xl" className={cls.container}>
            <Container maxWidth="sm">
              <form>
                <fieldset className={cls.wrap}>
                  <legend>MAKE A LIST</legend>
                  <div className={cls.results}>
                    <span>Total tasks {tasks.length}</span>
                    <span>Done {todoCount}</span>
                  </div>
                  {tasks.map((task, index) => {
                    const styleTextField = [cls.field];

                    if (task.isdone) {
                      styleTextField.push(cls.done);
                    }

                    return (
                      <div key={index + Math.random()}>
                        <CheckBox checked={task.checked} />
                        <TextField
                          id="outlined-full-width"
                          fullWidth
                          label={task.date}
                          size="small"
                          variant="outlined"
                          className={styleTextField.join(" ")}
                          value={task.text}
                          onFocus={() =>
                            dispatch({ type: HANDLE_TASK_SELECT, index })
                          }
                          isdone={task.isdone ? 1 : 0}
                          number={task.number}
                        />
                      </div>
                    );
                  })}
                  <Button
                    variant="outlined"
                    color="primary"
                    className={cls.btn}
                    onClick={() => dispatch({ type: HANDLE_POPUP_FORM })}
                  >
                    A&nbsp;D&nbsp;D
                  </Button>
                  {tasks.length ? (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={cls.btn}
                        disabled={
                          tasks[selectedTask]
                            ? tasks[selectedTask].disabled
                            : null
                        }
                        onClick={onClickTaskChange}
                      >
                        EDIT
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={cls.btn}
                        onClick={
                          tasks[selectedTask] && !tasks[selectedTask].isdone
                            ? () => onClickTaskDone(tasks[selectedTask].id)
                            : () => onClickTaskNotDone(tasks[selectedTask].id)
                        }
                      >
                        {tasks[selectedTask]
                          ? tasks[selectedTask].isdone
                            ? "Reopen"
                            : "Done"
                          : "Done"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={cls.btn}
                        onClick={() =>
                          onClickTaskDelete(tasks[selectedTask].id)
                        }
                      >
                        DELETE
                      </Button>
                    </>
                  ) : null}
                </fieldset>
              </form>
            </Container>
          </Container>
        ) : null}
        {formNewTask ? (
          <PopupForm name="Add task" placeholder="New task" />
        ) : null}
        {formChangeTask ? (
          <PopupForm name="Change task" placeholder="" />
        ) : null}
      </TodoListContext.Provider>
    </>
  );
};
