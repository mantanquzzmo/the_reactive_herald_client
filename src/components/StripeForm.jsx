import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import { Button } from 'semantic-ui-react'
import axios from 'axios'

const StripeForm = (props) => {

  const payWithStripe = async (event, props) => {
    event.preventDefault()
    await props.stripe.createToken().then(async response => {
      try {
        let paymentResponse = await axios.post('http://localhost:3000/api/subscription', {stripeToken: response.token.id})
        if (paymentResponse.data) {
          debugger
        }
      } catch {

      }
    })
  }
  return (
    <form id="payment" onSubmit={event => payWithStripe(event, props)}>
      <label>Card number </label>
      <CardNumberElement />
      <label> Expiration date</label>
      <CardExpiryElement />
      <label>CVC</label>
      <CardCVCElement />
      <Button >
        Submit
      </Button>
    </form>
  )
}

export default injectStripe(StripeForm)
