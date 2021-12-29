import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/message';
import Paginate from '../Components/Paginate';
import ProductCarousel from '../Components/ProductCarousel';
import Meta from '../Components/Meta';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const  pageNumber = params.pageNumber || 1;
  const productList = useSelector(state => state.productList);
  const {loading, products, error, page, pages} = productList

  useEffect(() =>{
      dispatch(listProducts(keyword,pageNumber))
  }, [dispatch, keyword, pageNumber])

    return (
        <>
         <Meta/>
         {!keyword ? 
           <ProductCarousel/> :
            <Link to='/' className='btn btn-light' >Go Back</Link>
         }
           <h1>Latest Products</h1>  
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
           <>
                <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}>  </Product>
                    </Col>
                ))}
               </Row> 
               <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </>
           }   
           
        </>
    )
}

export default HomeScreen
