import React, { useContext } from "react";
import classes from "./Auth.module.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Form from "../forms/Form";
import { AuthContext } from "../../context/auth/authContext";
import { AlertContext } from "../../context/alert/alertContext";
import { TodoAlert } from "../alert/Alert";

const Auth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { alert } = useContext(AlertContext);

  return (
    <Container maxWidth="xl" className={classes.authContainer}>
      <Typography component="div" style={{ height: "100vh" }}>
        <div className={classes.wrapButtons}>
          <div>
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch({ type: "SIGN_IN_WITHOUT_SIGN_UP" })}
          >
            SIGN IN WITHOUT SIGN UP
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
