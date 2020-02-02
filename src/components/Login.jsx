import React from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

const Login = props => {

  const { t } = useTranslation()

  const onLogin = event => {
    event.preventDefault();
    auth
      .signIn(event.target.email.value, event.target.password.value)
      .then(userDatas => {
        props.changeAuth(true);
        props.setUserAttrs(userDatas.data);
        props.changeAuthMessage(`${t('login.loggedInMess')} ${userDatas.data.email}`);
      })
      .catch(error => {
        props.changeAuthMessage(error.response.data.errors);
      });
  };

  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        props.changeAuth(false);
        props.changeLoginButton(true);
        props.changeSignupButton(true);
      })
      .catch(error => {
        props.changeAuthMessage(error);
      });
  };

  let loginFunction;

  switch (true) {
    case props.displayLoginButton &&
      !props.authenticated &&
      props.displaySignupButton:
      loginFunction = (
        <Link
          id="login-button"
          onClick={() => props.changeLoginButton(false)}
        >
          {t('login.login')}
        </Link>
      );
      break;
    case !props.displayLoginButton && !props.authenticated:
      loginFunction = (
        <>
          <p>{t('login.login')}</p>
          <form id="login-form" onSubmit={onLogin}>
            <label>{t('login.email')} </label>
            <input name="email" type="email" id="email"></input>

            <label>{t('login.password')} </label>
            <input name="password" type="password" id="password"></input>&nbsp;
            <button id="submit">{t('login.submit')}</button>
          </form>
          <Link
            id="back-button"
            onClick={() => props.changeLoginButton(true)}
          >
            {t('login.cancel')}
          </Link>
          {props.authMessage}
        </>
      );
      break;
    case props.authenticated:
      loginFunction = (
        <>
          <span>{props.authMessage}</span>&nbsp;
          <br/>
          <Link id="profile-link" to="/profile">
          {t('login.profile')}
          </Link>&nbsp;
          <Link id="logout-link" to="/" onClick={onLogout}>
          {t('login.logout')}
          </Link>
        </>
      );
      break;
    default:
      loginFunction = null;
  }

  return <div id="login">{loginFunction}</div>;
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  userAttrs: state.userAttrs,
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
    changeLoginButton: value => {
      dispatch({ type: "CHANGE_LOGINBUTTON", payload: value });
    },
    changeSignupButton: value => {
      dispatch({ type: "CHANGE_SIGNUPBUTTON", payload: value });
    },
    setUserAttrs: userAttrs => {
      dispatch({ type: "CHANGE_USER_ATTRIBUTES", payload: userAttrs });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
