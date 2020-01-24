import React from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";

const Signup = props => {

  const onSignup = event => {
    event.preventDefault();
    auth
      .signUp({
        email: event.target.email.value, 
        password: event.target.password.value
      })
      .then(userDatas => {
        props.changeAuth(true);
        props.changeAuthMessage(`Welcome! ${userDatas.data.data.email}`);
      })
      .catch(error => {
        props.changeAuthMessage(error.response.data.errors.full_messages)
      });
  };

  let signupFunction;

  switch (true) {
    case props.displaySignupButton && !props.authenticated && props.displayLoginButton:
      signupFunction = (
        <button id="signupButton" onClick={() => props.changeSignupButton(false)}>
          Sign Up
        </button>
      );
      break;
    case !props.displaySignupButton && !props.authenticated:
      signupFunction = (
        <>
        <p>Sign Up</p>
        <form id="signup-form" onSubmit={onSignup}>
          <label>Email:</label>
          <input name="email" type="email" id="email"></input>

          <label>Password:</label>
          <input name="password" type="password" id="password"></input>

          <button id="submit">Sign Up</button>
        </form>
        <button id="back-button" onClick={() => props.changeSignupButton(true)}>
          Cancel
        </button>
        {props.authMessage}
        </>
      );
      break;
    default: signupFunction = null
  }

  return <div id="signup">{signupFunction}</div>;
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  authMessage: state.authMessage,
  displaySignupButton: state.displaySignupButton,
  displayLoginButton: state.displayLoginButton
});

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    changeAuthMessage: message => {
      dispatch({ type: "CHANGE_AUTHMESSAGE", payload: message });
    },
    changeSignupButton: value => {
      dispatch({ type: "CHANGE_SIGNUPBUTTON", payload: value });
    },
    changeLoginButton: value => {
      dispatch({ type: "CHANGE_LOGINBUTTON", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
