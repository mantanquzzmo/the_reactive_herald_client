import React from "react";
import { connect } from "react-redux";
import { getUserData } from "../modules/getUserData"

const DisplayProfile = () => {
  const userData = getUserData()
  return (
    <>
      {userData ? (
        <>
          <h1>Your profile:</h1>
          <p>ID: {userData.id}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </>
      ) : ("Loading...")}
    </>
  );
};

export default connect(mapStateToProps)(DisplayProfile);
