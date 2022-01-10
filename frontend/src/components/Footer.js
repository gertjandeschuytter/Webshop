import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//footer in orde
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Webshop GJ - Studentennummer: 201972027</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
