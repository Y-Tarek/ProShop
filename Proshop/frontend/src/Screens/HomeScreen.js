import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product';

const HomeScreen = () => {
  const [products,setProducts] =    useState([])

  useEffect(() =>{
      const fetchProduts = async ()=>{
        // curl braces instead of res.data so we use {data}
          const {data} = await axios.get('/api/products');
          setProducts(data);
      }
      fetchProduts()
  }, [])

    return (
        <>
           <h1>Latest Products</h1>  
           <Row>
               {products.map((product) => (
                   <Col sm={12} md={6} lg={4} xl={3}>
                     <Product product={product}>  </Product>
                   </Col>
               ))}
           </Row>
        </>
    )
}

export default HomeScreen
