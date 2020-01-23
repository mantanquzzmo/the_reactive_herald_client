import React, { useEffect } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";

const DisplayProfile = props => {
  let userData
  const userDataGrab = async () => {
    userData = await getUserData(props.userAttrs.id);
    debugger
    props.changeUserShowData(userData);
  };

  useEffect(() => {

    userDataGrab();
  }, [props.userShowData]);

  return (
  <>
  {props.userShowData && <p>{props.userShowData}</p>}
  </>
  )
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
