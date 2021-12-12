import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  Message from '../Components/message';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';


const CartScreen = () => {
  const params = useParams();
  const history = useNavigate();
  const id = params.id;
  const location = useLocation()
  
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  console.log(qty);
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  console.log(cartItems);
  useEffect(() => {
      if(id)
       dispatch(addToCart(id,qty))
    
  }, [dispatch, id, qty])

  const checkoutHandler = () => {
      console.log('checkout');
      history('/login?redirect=shipping')
  }

  const  removeFromCartHandler = (id) => {
     dispatch(removeFromCart(id))
  }
    return (
        <Row>
            <Col md={8}>
               <h2>Shopping Cart</h2>
               {cartItems.length === 0  ? 
                <Message>
                    Your Card is Empty <Link to='/'>Go Back</Link>
                </Message> : 
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={ item.prodeuct}>
                                <Row>
                                  <Col md ={2}>
                                   <Image src={item.image}
                                   alt={item.name}
                                   fluid
                                   rounded
                                   ></Image>
                                  </Col>
                                  <Col md={3}>
                                   <Link to={`/product/${item.product}`}>{item.name}</Link>
                                  </Col>
                                  <Col md={2}>
                                   {item.price}
                                  </Col>
                                  <Col md={2}>
                                  <Form.Control as='select' value={qty} onChange={(e) => {
                                           dispatch(addToCart(item.product, Number(e.target.value)))
                                       }}>
                                          { [...Array(item.countInStock).keys()].map(x => (
                                               <option key={x+1} value={x+1}>
                                                   {x+1}
                                               </option>
                                           ))}
                                       </Form.Control>
                                  </Col>
                                  <Col md={2}>
                                   <Button type='button' variant='light' onClick={() => {
                                       removeFromCartHandler(item.product)
                                   }}>
                                      <i className='fas fa-trash '/>
                                   </Button>
                                  </Col>
                                  
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    
                    }
            </Col>  

            <Col md={4}>
             <Card>
                 <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h2>subTotal ({cartItems.reduce((acc, cur) => acc + qty, 0 )}) Items
                      $
                       {cartItems.reduce((acc,item) => acc + qty * item.price, 0).toFixed(2)}
                      </h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Button
                      type='button'
                      className='btn-block'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                      >
                          Proceed To Checkout
                      </Button>
                  </ListGroup.Item>
                 </ListGroup>
             </Card>
            </Col>

            <Col md={2}>
            
            </Col> 
        </Row>
    )
}

export default CartScreen

