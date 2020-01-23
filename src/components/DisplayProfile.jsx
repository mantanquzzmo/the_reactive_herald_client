import React from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";

const DisplayProfile = props => {
  debugger
  const userData = getUserData(props.userAttrs.id);
  let profile;

  return (
    <>
    <p>hej</p>
    </>
  );
};

const mapStateToProps = state => ({
  userAttrs: state.userAttrs
});

export default connect(mapStateToProps)(DisplayProfile)
