export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

export const alertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        text: action.payload.text,
        severity: action.payload.severity,
        alertVisible: true
      };
    case HIDE_ALERT:
      return {
        ...state,
        alertVisible: false
      };
    default:
      return state;
  }
};
