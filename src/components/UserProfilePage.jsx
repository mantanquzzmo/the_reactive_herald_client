import React from "react";
import { connect } from "react-redux";
import { getUserData } from "../modules/getUserData"

const UserProfile = () => {
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

const mapStateToProps = state => ({
  userId: state.userId,
});

export default connect(mapStateToProps)(UserProfile);
