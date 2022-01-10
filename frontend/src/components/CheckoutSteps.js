import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Log in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Log in</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Levering</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Levering</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Betaling</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Betaling</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Plaats bestelling</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Plaats bestelling</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
