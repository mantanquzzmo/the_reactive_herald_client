import React, { useEffect } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";

const DisplayProfile = props => {
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
            <h1>Your Profile:</h1>
            <h4>Email:</h4> <p>{props.userShowData.email}</p>
            <h4>Role:</h4> <p>{props.userShowData.role}</p>
          </>
        ) : (
          <>
            <h1>Your Profile:</h1>
            <h4>{props.userShowData}</h4>
          </>
        )
      ) : (
        <p>Please log in to see your profile</p>
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
