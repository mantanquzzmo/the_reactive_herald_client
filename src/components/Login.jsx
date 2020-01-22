import React, { useState } from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";

const Login = props => {
  const [displayLoginButton, setDisplayLoginButton] = useState(true);

  const onLogin = event => {
    event.preventDefault();
    auth
      .signIn(event.target.email.value, event.target.password.value)
      .then(userDatas => {
        debugger
        props.changeAuth(true);
        props.changeAuthMessage(`Logged in as: ${userDatas.data.email}`);
      })
      .catch(error => {
        debugger
        props.changeAuthMessage(`Invalid login credentials. Try again.`)
      });
  };

  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        props.changeAuth(false);
        setDisplayLoginButton(true);
      })
      .catch(error => {
        props.changeAuthMessage(error);
      });
  };

  let loginFunction;

  switch (true) {
    case displayLoginButton && !props.authenticated:
      loginFunction = (
        <button id="loginButton" onClick={() => setDisplayLoginButton(false)}>
          Login
        </button>
      );
      break;
    case !displayLoginButton && !props.authenticated:
      loginFunction = (
        <>
        <form id="login-form" onSubmit={onLogin}>
          <label>Email:</label>
          <input name="email" type="email" id="email"></input>

          <label>Password:</label>
          <input name="password" type="password" id="password"></input>

          <button id="submit">Submit</button>
        </form>
        {props.authMessage}
        </>
      );
      break;
    case props.authenticated:
      loginFunction = (
        <>
        {props.authMessage}
          <button id="logoutButton" onClick={onLogout}>
            Logout
          </button>
        </>
      );
      break;
  }

  return <div id="login">{loginFunction}</div>;
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  authMessage: state.authMessage
});

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    changeAuthMessage: message => {
      dispatch({ type: "CHANGE_AUTHMESSAGE", payload: message });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
