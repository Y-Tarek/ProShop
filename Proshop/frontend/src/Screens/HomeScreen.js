import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/message';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, products, error} = productList

  useEffect(() =>{
      dispatch(listProducts())
  }, [dispatch])

    return (
        <>
           <h1>Latest Products</h1>  
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}>  </Product>
                    </Col>
                ))}
               </Row> 
           }   
           
        </>
    )
}

export default HomeScreen
