import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";

const StripeForm = props => {

  const payWithStripe = async (event, props) => {
    event.preventDefault();
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    await props.stripe.createToken().then(async response => {
      try {
        let paymentResponse = await axios.post(
          "http://localhost:3000/api/v1/subscriptions",
          { stripeToken: response.token.id },
          { headers: headers }
        );
        if (paymentResponse.status === 200) {
          props.changePaymentMessage(
            "Thank you for subscribing to The Reactive Herald!"
          );
        }
      } catch (error) {
        props.changePaymentMessage(response.error.message);
      }
    });
  };
  return (
    <>
      <form id="payment" onSubmit={event => payWithStripe(event, props)}>
        <label>Card number </label>
        <CardNumberElement />
        <label> Expiration date</label>
        <CardExpiryElement />
        <label>CVC</label>
        <CardCVCElement />
        <Button>Submit</Button>
      </form>
      <p id="message">{props.paymentMessage}</p>
    </>
  );
};

const mapStateToProps = state => {
  return {
    paymentMessage: state.paymentMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePaymentMessage: message => {
      dispatch({ type: "CHANGE_PAYMENTMESSAGE", payload: message });
    }
  };
};

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(StripeForm)
);
