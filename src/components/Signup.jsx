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
      }, "http://localhost:3000")
      .then(userDatas => {
        props.changeAuth(true);
        props.changeAuthMessage(`Welcome! ${userDatas.data.email}`);
      })
      .catch(error => {
        props.changeAuthMessage(`Something went wrong. Try again.`)
      });
  };

  let signupFunction;
  debugger
  switch (true) {
    case props.displaySignupButton && !props.authenticated:
      signupFunction = (
        <button id="signupButton" onClick={() => props.setDisplaySignupButton(false)}>
          Sign Up
        </button>
      );
      break;
    case !props.displaySignupButton && !props.authenticated:
      signupFunction = (
        <>
        <form id="signup-form" onSubmit={onSignup}>
          <label>Email:</label>
          <input name="email" type="email" id="email"></input>

          <label>Password:</label>
          <input name="password" type="password" id="password"></input>

          <button id="submit">Sign Up</button>
        </form>
        {props.authMessage}
        </>
      );
      break;
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
