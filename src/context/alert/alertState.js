import React, { useReducer } from "react";
import { alertReducer, SHOW_ALERT, HIDE_ALERT } from "./alertReducer";
import { AlertContext } from "./alertContext";

export const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, {
    text: "",
    severity: "",
    alertVisible: false
  });

  const showAlert = (text, severity) => {
    dispatch({ type: SHOW_ALERT, payload: { text, severity } });
  };

  const hideAlert = () => {
    dispatch({ type: HIDE_ALERT });
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};
