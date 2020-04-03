export const NEW_TASK_DRAFT_HANDLER = "NEW_TASK_DRAFT_HANDLER";
export const ON_CLICK_TASK_CHANGE = "ON_CLICK_TASK_CHANGE";
export const ON_CHANGE_DRAFT = "ON_CHANGE_DRAFT";
export const HANDLE_POPUP_FORM = "HANDLE_POPUP_FORM";
export const ON_CLICK_TASK_DONE = "ON_CLICK_TASK_DONE";
export const ON_CLICK_TASK_NOT_DONE = "ON_CLICK_TASK_NOT_DONE";
export const SAVE_NEW_TASK = "SAVE_NEW_TASK";
export const SAVE_CHANGE_TASK = "SAVE_CHANGE_TASK";
export const CANCEL_NEW_TASK = "CANCEL_NEW_TASK";
export const CANCEL_CHANGE_TASK = "CANCEL_CHANGE_TASK";
export const HANDLE_TASK_SELECT = "HANDLE_TASK_SELECT";
export const ON_CLICK_TASK_DELETE = "ON_CLICK_TASK_DELETE";
export const SHOW_ALERT_TODO = "SHOW_ALERT_TODO";
export const HIDE_ALERT_TODO = "HIDE_ALERT_TODO";

const todoListReducer = (state, action) => {
  let { tasks, selectedTask, newTaskDraft } = state;
  let stateCopy = { ...state };
  let count = 0;

  switch (action.type) {
    case NEW_TASK_DRAFT_HANDLER:
      return { ...state, newTaskDraft: action.value };
    case ON_CLICK_TASK_CHANGE:
      stateCopy.formChangeTask = true;
      stateCopy.formMakeList = false;
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks[selectedTask] = {
        ...state.tasks[selectedTask],
        draft: tasks[selectedTask].text,
        disabled: true
      };
      return stateCopy;
    case ON_CHANGE_DRAFT:
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks[selectedTask] = {
        ...state.tasks[selectedTask],
        draft: action.value
      };
      return stateCopy;
    case HANDLE_POPUP_FORM:
      stateCopy.formNewTask = true;
      stateCopy.formMakeList = false;
      return stateCopy;
    case ON_CLICK_TASK_DONE:
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks[selectedTask] = {
        ...state.tasks[selectedTask],
        isdone: "true",
        disabled: true,
        number: null
      };
      for (let i = 0; i < stateCopy.tasks.length; i++) {
        if (stateCopy.tasks[i].isdone === "true") count++;
      }
      stateCopy.todoCount = count;
      return stateCopy;
    case ON_CLICK_TASK_NOT_DONE:
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks[selectedTask] = {
        ...state.tasks[selectedTask],
        isdone: "false",
        disabled: false,
        number: null
      };
      for (let i = 0; i < stateCopy.tasks.length; i++) {
        if (stateCopy.tasks[i].isdone === "true") count++;
      }
      stateCopy.todoCount = count;
      return stateCopy;
    case ON_CLICK_TASK_DELETE:
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks.splice(selectedTask, 1);
      for (let i = 0; i < stateCopy.tasks.length; i++) {
        if (stateCopy.tasks[i].isdone === "true") count++;
      }
      stateCopy.todoCount = count;
      return stateCopy;
    case SAVE_NEW_TASK:
      stateCopy.tasks = [
        ...state.tasks,
        {
          text: newTaskDraft,
          draft: "",
          disabled: false,
          isdone: "false",
          number: null
        }
      ];
      stateCopy.newTaskDraft = "";
      stateCopy.formNewTask = false;
      stateCopy.formMakeList = true;
      return stateCopy;
    case SAVE_CHANGE_TASK:
      stateCopy.formChangeTask = false;
      stateCopy.formMakeList = true;
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks[selectedTask] = {
        ...state.tasks[selectedTask],
        text: state.tasks[selectedTask].draft,
        draft: "",
        disabled: false,
        number: null
      };
      return stateCopy;
    case CANCEL_NEW_TASK:
      stateCopy.newTaskDraft = "";
      stateCopy.formNewTask = false;
      stateCopy.formMakeList = true;
      return stateCopy;
    case CANCEL_CHANGE_TASK:
      stateCopy.formChangeTask = false;
      stateCopy.formMakeList = true;
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks[selectedTask] = {
        ...state.tasks[selectedTask],
        disabled: false,
        number: null
      };
      return stateCopy;
    case HANDLE_TASK_SELECT:
      stateCopy.selectedTask = action.index;
      stateCopy.tasks = [...state.tasks];
      stateCopy.tasks[action.index] = {
        ...state.tasks[action.index],
        number: action.index
      };
      return stateCopy;
    default:
      return state;
  }
};

export default todoListReducer;
