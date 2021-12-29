import React, {useState,useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, ListGroup, Card, Button, Image, ListGroupItem, Form} from 'react-bootstrap';
import Rating from '../Components/Rating';
import axios from 'axios';
import { listProductDetails, reviewProduct } from '../actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/message';
import { PRODUCT_REVIEW_RESET } from '../constants/productContants';
import Meta from '../Components/Meta';


const ProductScreen = () => {
    const userLogin = useSelector(state => state.userLogin);
    const  {userInfo} = userLogin;
    
    const productReview = useSelector(state => state.productReview);
    const {loading: loadingReview, success: successReview, error:errorReview} = productReview;

    let history = useNavigate();
    const [qty, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const params = useParams();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails
    const dispatch = useDispatch();

    useEffect(() => {
        if(successReview){
            alert('Review Submitted!');
            setRating(0);
            setComment('')
            dispatch({type:PRODUCT_REVIEW_RESET})
        }
       dispatch(listProductDetails(params.id))
    },[dispatch, successReview]);

    const addToCartHandler = () => {
        history(`/cart/${params.id}?qty=${qty}`)
    }

    const submitReviewHandler = (e) => {
        e.preventDefault();
        dispatch(reviewProduct(params.id,{rating,comment}))
       
    }

    return (
        <>
         <Meta title={product.name} descreption={product.descreption} keywords={product.brand}/>
           <Link className='btn btn-light my-3' to='/'>Go Back</Link>
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
             <>
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
           
           <Row>
               <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                    {product.reviews.map(r => (
                        <ListGroup.Item key={r._id}>
                            <strong>{r.name}</strong>
                            <Rating value={r.rating}/>
                            <p>{r.createdAt.substring(0,10)}</p>
                            <p>{r.comment}</p>
                        </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                        <h2>Write A Cusotmer Review</h2>
                        {errorReview && <Message variant='danger'>{errorReview}</Message>}
                        {userInfo ? (
                            <Form onSubmit={submitReviewHandler}>
                              <Form.Group controlId='rating'>
                                  <Form.Label>Rating</Form.Label>
                                  <Form.Control as='select' value={rating} onChange={(e) => {setRating(e.target.value)}}>
                                      <option value=''>Select...</option>
                                      <option value='1'>1 - Poor.</option>
                                      <option value='2'>2 - Fair.</option>
                                      <option value='3'>3 - Good.</option>
                                      <option value='4'>4 - Very Good.</option>
                                      <option value='5'>5 - Excellent.</option>
                                  </Form.Control>
                              </Form.Group>
                              <Form.Group controlId='comment'>
                                  <Form.Label>Comment</Form.Label>
                                  <Form.Control as='textarea' row='3' value={comment} onChange={(e) => {setComment(e.target.value)}}></Form.Control>
                              </Form.Group>
                              <Button type='submit' variant='primary'>Submit</Button>
                            </Form>
                        ) : <Message>Please <Link to='/login'>Sign In</Link>to Write a Review</Message>}
                    </ListGroup.Item>
                </ListGroup>
               </Col>
           </Row>
           </>
           ) } 
           
        </>
    )
}

export default ProductScreen
