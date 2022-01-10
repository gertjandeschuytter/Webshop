import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails
} from '../actions/orderActions'
import Firework from '../components/Firework'


const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  if (!loading) {
    //bereken prijs
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])


  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
  <>
    <Firework/>
    <h1>Bestelling {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Levering</h2>
            <p><strong>Naam: </strong> {order.user.name}</p>
            <p>
            <strong>Email: </strong>
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Adres:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Betaalmethode</h2>
            <strong>Methode: </strong>
            {order.paymentMethod}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Producten uit bestelling</h2>
            {order.orderItems.length === 0 ? (
              <Message>Bestelling is leeg</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x €{item.price} = €{item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Samenvatting Bestelling</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Producten</Col>
                <Col>€{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Levering</Col>
                <Col>€{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Btw</Col>
                <Col>€{order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Totaalprijs</Col>
                <Col>€{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>

  </> 
}

export default OrderScreen
