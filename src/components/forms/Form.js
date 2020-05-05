import React, { useContext } from "react";
import classes from "./form.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../context/auth/authContext";
import { AlertContext } from "../../context/alert/alertContext";

const Form = ({ name }) => {
  const { state, dispatch } = useContext(AuthContext);
  let { login, password1, password2, email } = state.registrationForm;
  let { login: loginAuth, password: passwordAuth } = state.authorizationForm;

  const { showAlert, hideAlert } = useContext(AlertContext);

  const saveDataRegistrationForm = () => {
    if (!login.draft || !password1.draft || !password2.draft || !email.draft) {
      showAlert("Fill in all fields!", "error");
    } else if (password1.draft !== password2.draft) {
      showAlert("Password not confirm!", "error");
    } else {
      showAlert("Registration came succes!", "success");
      dispatch({ type: "SAVE_DATA_REGISTRATION_FORM" });
    }
  };

  const signIn = () => {
    if (!loginAuth.draft || !passwordAuth.draft) {
      showAlert("Fill in all fields!", "error");
    } else if (
      loginAuth.draft &&
      passwordAuth.draft &&
      login.value !== loginAuth.draft
    ) {
      showAlert("Invalid login!", "error");
    } else if (
      loginAuth.draft &&
      passwordAuth.draft &&
      password2.value !== passwordAuth.draft
    ) {
      showAlert("Invalid password!", "error");
    } else if (
      loginAuth.draft &&
      passwordAuth.draft &&
      (login.value === loginAuth.draft ||
        password2.value === passwordAuth.draft)
    ) {
      hideAlert();
      dispatch({ type: "SIGN_IN" });
    }
  };

  return (
    <div className={classes.wrapForm}>
      <form onSubmit={event => event.preventDefault()}>
        <fieldset className={classes.area}>
          <legend>{name === "Sign up" ? "SIGN UP" : "LOG IN"}</legend>
          <div
            className={classes.signUp}
            style={name === "Sign up" ? { height: "65vh" } : { height: "42vh" }}
          >
            {name === "Sign up" ? (
              <>
                <TextField
                  label="Enter login"
                  variant="outlined"
                  autoComplete="username"
                  size="small"
                  onChange={event =>
                    dispatch({
                      type: "ON_DRAFTS_REGISTRATION_FORM_CHANGE",
                      value: event.target.value,
                      fieldName: "login"
                    })
                  }
                  value={login.draft}
                />
                <TextField
                  label="Enter password"
                  type="password"
                  autoComplete="new-password"
                  variant="outlined"
                  size="small"
                  onChange={event =>
                    dispatch({
                      type: "ON_DRAFTS_REGISTRATION_FORM_CHANGE",
                      value: event.target.value,
                      fieldName: "password1"
                    })
                  }
                  value={password1.draft}
                />
                <TextField
                  label="Enter password again"
                  type="password"
                  autoComplete="new-password"
                  variant="outlined"
                  size="small"
                  onChange={event =>
                    dispatch({
                      type: "ON_DRAFTS_REGISTRATION_FORM_CHANGE",
                      value: event.target.value,
                      fieldName: "password2"
                    })
                  }
                  value={password2.draft}
                />
                <TextField
                  label="Enter email"
                  variant="outlined"
                  size="small"
                  onChange={event =>
                    dispatch({
                      type: "ON_DRAFTS_REGISTRATION_FORM_CHANGE",
                      value: event.target.value,
                      fieldName: "email"
                    })
                  }
                  value={email.draft}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Enter login"
                  variant="outlined"
                  size="small"
                  onChange={event =>
                    dispatch({
                      type: "ON_DRAFTS_AUTHORIZATION_FORM_CHANGE",
                      value: event.target.value,
                      fieldName: "login"
                    })
                  }
                  value={loginAuth.draft}
                />
                <TextField
                  label="Enter password"
                  type="password"
                  variant="outlined"
                  size="small"
                  onChange={event =>
                    dispatch({
                      type: "ON_DRAFTS_AUTHORIZATION_FORM_CHANGE",
                      value: event.target.value,
                      fieldName: "password"
                    })
                  }
                  value={passwordAuth.draft}
                />
              </>
            )}
            <Button
              variant="outlined"
              color="primary"
              onClick={name === "Sign up" ? saveDataRegistrationForm : signIn}
            >
              {name === "Sign up" ? "SAVE" : "SIGN IN"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
