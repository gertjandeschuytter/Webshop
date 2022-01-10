import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push('/cart/' + match.params.id + '?qty=' + qty)
  }
  
//fluid om afbeelding in zijn container te zetten
//flush om randen te verwijderen
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Ga terug</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>{product.name}</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
          </ListGroup.Item>
          <ListGroup.Item>
            Prijs: €{product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            Omschrijving: {product.description}
          </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                <Col>Prijs: </Col>
                <Col>€{product.price}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                <Col>Status: </Col>
                  <Col>
                  {product.countInStock > 0 ? 'In voorraad' : 'Niet in voorraad'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>kies aantal:</Col>
                    <Col>
                      <Form.Control as='select' value={qty} onChange={(e) => 
                        setQty(e.target.value)}>

                        {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                        
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroup.Item>
                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0      
                }>
                Voeg toe aan mandje
                </Button>
              </ListGroup.Item>
              </ListGroup>
              </Card>
        </Col>
      </Row>
      )}
    </>
  )
}

//eerste lijntje geeft een array van de countInStock, moesten er 3 producten zijn zou het een array geven van [0,1,2]
//dan wordt dit gemapt en voor elke key telt hij de values van de opties op en komt hij aan het stock aantal

export default ProductScreen
