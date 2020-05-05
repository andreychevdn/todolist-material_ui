import React, { useReducer } from "react";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/core/styles";
import Auth from "./components/auth/Auth";
import { AuthContext } from "./context/auth/authContext";
import authorizationReducer from "./reducers/authorizationReducer";
import { Home } from "./pages/Home";
import { TodoList } from "./pages/TodoList";
import { Manual } from "./pages/Manual";
import { Navbar } from "./components/navbar/Navbar";
import { AlertState } from "./context/alert/alertState";

function App(props) {
  const [state, dispatch] = useReducer(authorizationReducer, {
    registrationForm: JSON.parse(
      sessionStorage.getItem("registrationForm")
    ) || {
      login: {
        draft: "",
        value: "",
      },
      password1: {
        draft: "",
        value: "",
      },
      password2: {
        draft: "",
        value: "",
      },
      email: {
        draft: "",
        value: "",
      },
    },
    authorizationForm: {
      login: {
        draft: "",
      },
      password: {
        draft: "",
      },
    },
    isValid: false,
    isRegistration: false,
  });

  return (
    <Fragment>
      <CssBaseline />
      <StylesProvider injectFirst>
        <div>
          <AlertState>
            <AuthContext.Provider value={{ state, dispatch }}>
              {!state.isValid ? <Route path="/todolist-material_ui/" component={Auth} /> : null}
            </AuthContext.Provider>
            {state.isValid ? (
              <>
                <Route path="/todolist-material_ui/navbar/" component={Navbar} />
                <Switch>
                  <Route path="/todolist-material_ui/navbar/home" component={Home} />
                  <Route path="/todolist-material_ui/navbar/todolist" component={TodoList} />
                  <Route path="/todolist-material_ui/navbar/manual" component={Manual} />
                </Switch>
              </>
            ) : null}
          </AlertState>
        </div>
      </StylesProvider>
    </Fragment>
  );
}

export default App;
