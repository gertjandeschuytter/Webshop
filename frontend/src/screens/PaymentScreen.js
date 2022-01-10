import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Bancontact')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Betaalmethode</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Seleteer een betaalmethode</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Belfius Direct Net'
              id='Belfius Direct Net'
              name='paymentMethod'
              value='Belfius Direct Net'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
             <Form.Check
              type='radio'
              label='Bancontact'
              id='Bancontact'
              name='paymentMethod'
              value='Bancontact'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
              <Form.Check
              type='radio'
              label='ING HomePay'
              id='ING HomePay'
              name='paymentMethod'
              value='ING HomePay'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Ga verder
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
