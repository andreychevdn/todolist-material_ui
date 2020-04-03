import React, { useReducer, useEffect } from "react";
import cls from "./todolist.module.css";
import { TodoListContext } from "../context/todoListContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { PopupForm } from "../components/popupForm/PopupForm";
import todoListReducer, {
  HANDLE_TASK_SELECT,
  ON_CLICK_TASK_NOT_DONE,
  HANDLE_POPUP_FORM,
  ON_CLICK_TASK_DELETE,
  ON_CLICK_TASK_DONE,
  ON_CLICK_TASK_CHANGE
} from "../reducers/todoListReducer";
import { TextField } from "@material-ui/core";

export const TodoList = () => {
  const [state, dispatch] = useReducer(todoListReducer, {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    newTaskDraft: "",
    formMakeList: true,
    formNewTask: false,
    formChangeTask: false,
    selectedTask: null,
    todoCount: 0
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  let {
    tasks,
    formMakeList,
    formNewTask,
    formChangeTask,
    selectedTask,
    todoCount
  } = state;

  const onClickTaskChange = () => {
    if (tasks && selectedTask !== null && tasks[selectedTask].number !== null) {
      dispatch({ type: ON_CLICK_TASK_CHANGE });
    }
  };

  const onClickTaskDone = () => {
    if (
      tasks.length &&
      selectedTask !== null &&
      tasks[selectedTask].number !== null
    ) {
      dispatch({ type: ON_CLICK_TASK_DONE });
    }
  };

  const onClickTaskNotDone = () => {
    if (
      tasks.length &&
      selectedTask !== null &&
      tasks[selectedTask].number !== null
    ) {
      dispatch({ type: ON_CLICK_TASK_NOT_DONE });
    }
  };

  const onClickTaskDelete = () => {
    if (
      tasks.length &&
      selectedTask !== null &&
      tasks[selectedTask].number !== null
    ) {
      dispatch({ type: ON_CLICK_TASK_DELETE });
    }
  };

  return (
    <>
      <TodoListContext.Provider value={{ state, dispatch }}>
        {formMakeList ? (
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
                    const styleTextField = [cls.color];

                    if (task.isdone === "true") {
                      styleTextField.push(cls.done);
                    }

                    return (
                      <TextField
                        id="outlined-full-width"
                        fullWidth
                        size="small"
                        variant="outlined"
                        className={styleTextField.join(" ")}
                        key={index + Math.random()}
                        value={task.text}
                        onFocus={() =>
                          dispatch({ type: HANDLE_TASK_SELECT, index })
                        }
                        isdone={task.isdone}
                        number={task.number}
                      />
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
                          tasks[selectedTask] &&
                          tasks[selectedTask].isdone === "false"
                            ? onClickTaskDone
                            : onClickTaskNotDone
                        }
                      >
                        {tasks[selectedTask]
                          ? tasks[selectedTask].isdone === "true"
                            ? "Reopen"
                            : "Done"
                          : "Done"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={cls.btn}
                        onClick={onClickTaskDelete}
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
