import React, { useEffect } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
            <Link to="/">Back to the Herald</Link>
          </>
        ) : (
          <>
            <h1>Your Profile:</h1>
            <h4>{props.userShowData}</h4>

            <Link to="/">Back to the Herald</Link>
          </>
        )
      ) : (
        <>
          <p>Please log in to see your profile</p>

          <Link to="/">Back to the Herald</Link>
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
