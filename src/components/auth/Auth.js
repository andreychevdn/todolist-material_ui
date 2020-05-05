import React, { useContext, useEffect } from "react";
import classes from "./Auth.module.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Form from "../forms/Form";
import { AuthContext } from "../../context/auth/authContext";
import { AlertContext } from "../../context/alert/alertContext";
import { TodoAlert } from "../alert/Alert";

const Auth = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const { alert } = useContext(AlertContext);

  const goToAuth = () => {
    props.history.push("/todolist-material_ui/");
  };

  useEffect(() => {
    goToAuth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "registrationForm",
      JSON.stringify(state.registrationForm)
    );
  }, [state.registrationForm]);

  return (
    <Container maxWidth="xl" className={classes.authContainer}>
      <Typography component="div" style={{ height: "100vh" }}>
        <div className={classes.wrapButtons}>
          <Button
            className={classes.btnSignUp}
            variant="outlined"
            color="primary"
            onClick={() => dispatch({ type: "SIGN_UP" })}
          >
            SIGN UP
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => dispatch({ type: "LOG_IN" })}
          >
            LOG IN
          </Button>
        </div>
        {alert.alertVisible ? <TodoAlert /> : null}
        {state.isRegistration ? (
          <Form name="Log in" />
        ) : (
          <Form name="Sign up" />
        )}
      </Typography>
    </Container>
  );
};

export default Auth;
