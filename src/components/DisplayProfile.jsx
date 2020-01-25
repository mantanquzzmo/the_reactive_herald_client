import React, { useEffect, useState } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeForm from "./StripeForm";
import { Elements } from "react-stripe-elements";
import { Button } from "semantic-ui-react";

const DisplayProfile = props => {
  const userDataGrab = async () => {
    if (props.userAttrs) {
      props.changeUserShowData(await getUserData(props.userAttrs.id));
    }
  };

  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);

  useEffect(() => {
    userDataGrab();
  }, [props.userAttrs]);

  const renderSubscription = () => {
    switch (true) {
      case props.userAttrs.role !== null: {
        return props.userAttrs.role;
      }
      case props.userAttrs.role === null && !showSubscriptionForm: {
        return (
          <>
            <span>No subscription</span>
            <Button
              onClick={() => {
                setShowSubscriptionForm(true);
              }}
            >
              Subscribe!
            </Button>
          </>
        );
      }
      case showSubscriptionForm: {
        return (
          <Elements>
            <StripeForm />
          </Elements>
        );
      }
    }
  };

  return (
    <div id="profile">
      {props.userShowData ? (
        props.userShowData.email ? (
          <>
            <h1>Your Profile:</h1>
            <h4>Email:</h4> <p>{props.userShowData.email}</p>
            <h4>Subscription:</h4> <div>{renderSubscription()}</div>
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
