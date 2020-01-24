import React, { useEffect, useState } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";

const DisplayProfile = props => {

    const userDataGrab = async () => {
      if (props.userAttrs) {
        debugger
      props.changeUserShowData(await getUserData(props.userAttrs.id));
    }}

  useEffect(() => {
    userDataGrab();
  }, [props.userAttrs])

  return (
    <>
      {props.userShowData ? (
        <>
          <h1>Your Profile:</h1>
          <h4>Email:</h4> <p>{props.userShowData.email}</p>
          <h4>Role:</h4> <p>{props.userShowData.role}</p>
        </>
      ) : (
        <>
        <h1>Your Profile:</h1>
        <h4>"Nothing to see here, please log in.</h4>
        </>
      )}
    </>
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
