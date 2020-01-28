import React, { useEffect } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

const DisplayProfile = props => {

  const { t, i18n } = useTranslation('common')
  
  const userDataGrab = async () => {
    if (props.userAttrs) {
      props.changeUserShowData(await getUserData(props.userAttrs.id));
    }
  };

  useEffect(() => {
    userDataGrab();
  }, [props.userAttrs]);

  return (
    <div id="profile">
      {props.userShowData ? (
        props.userShowData.email ? (
          <>
            <h1>{t('dp.yourProfile')}:</h1>
            <h4>{t('dp.email')}:</h4> <p>{props.userShowData.email}</p>
            <h4>{t('dp.role')}:</h4> <p>{props.userShowData.role}</p>
            <Link to="/">{t('dp.backToHerald')}</Link>
          </>
        ) : (
          <>
            <h1>{t('dp.yourProfile')}:</h1>
            <h4>{props.userShowData}</h4>

            <Link to="/">{t('dp.backToHerald')}</Link>
          </>
        )
      ) : (
        <>
          <p>{t('dp.loginProfile')}</p>

          <Link to="/">{t('dp.backToHerald')}</Link>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  userAttrs: state.userAttrs,
  userShowData: state.userShowData
});

const mapDispatchToProps = dispatch => {
  return {
    changeUserShowData: data => {
      dispatch({ type: "SET_SHOWDATA", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProfile);
