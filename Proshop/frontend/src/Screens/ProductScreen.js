import React, {useState,useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, ListGroup, Card, Button, Image, ListGroupItem, Form} from 'react-bootstrap';
import Rating from '../Components/Rating';
import axios from 'axios';
import { listProductDetails } from '../actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/message';


const ProductScreen = () => {
    let history = useNavigate();
    const [qty, setQuantity] = useState(0);
    const params = useParams();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(listProductDetails(params.id))
    },[dispatch]);

    const addToCartHandler = () => {
        history(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <>
           <Link className='btn btn-light my-3' to='/'>Go Back</Link>
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
               <Row>
               <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
               </Col>

               <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{product.name}</h3>    
                     </ListGroup.Item>

                     <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                     </ListGroup.Item>

                     <ListGroup.Item>
                         Price: `${product.price}`
                     </ListGroup.Item>

                     <ListGroup.Item>
                         Descreption: {product.descreption}
                     </ListGroup.Item>
                </ListGroup>
               </Col>

               <Col md={3}>
                 <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                              <Row>
                                  <Col>
                                     Price:
                                  </Col>

                                  <Col>
                                     <strong>${product.price}</strong>
                                  </Col>
                              </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                              <Row>
                                  <Col>
                                     Status:
                                  </Col>

                                  <Col>
                                     {product.countInStock > 0 ? 'In Stock' : 'Out Of Stuck'}
                                  </Col>
                              </Row>
                        </ListGroup.Item>

                          {product.countInStock > 0 && (
                              <ListGroup.Item>
                                  <Row>
                                      <Col>Qty</Col>
                                      <Col>
                                       <Form.Control as='select' value={qty} onChange={(e) => {
                                           setQuantity(e.target.value);
                                       }}>
                                          { [...Array(product.countInStock).keys()].map(x => (
                                               <option key={x+1} value={x+1}>
                                                   {x+1}
                                               </option>
                                           ))}
                                       </Form.Control>
                                      </Col>
                                  </Row>
                              </ListGroup.Item>
                          )}
                        <ListGroup.Item>
                            <Button className='btn-block' onClick={addToCartHandler} type='button' disabled={product.countInStock ===0 }>ADD TO CART</Button>
                        </ListGroup.Item>
                    </ListGroup>
                 </Card>
               </Col>
           </Row>
           ) } 
           
        </>
    )
}

export default ProductScreen
