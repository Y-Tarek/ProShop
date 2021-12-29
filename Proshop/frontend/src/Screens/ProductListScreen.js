import React, {useState,useEffect} from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import  Message  from '../Components/message';
import  Loader  from '../Components/Loader';
import {listProducts, deleteProduct, createProduct} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productContants';
import  Paginate  from '../Components/Paginate';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const pageNumber = params.pageNumber  || 1;
    

    const productList = useSelector(state => state.productList);
    const {loading, error, products, page, pages} = productList;

    const productDelete = useSelector(state => state.productDelete);
    const {success:successDelete, loading:loadinDelete, error:errorDelete} = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const {success:successCreate, loading:loadingCreate, error:errorCreate, product:createdProduct} = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const  {userInfo} = userLogin;

    const history = useNavigate();
    const location = useLocation();
    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history('/login')
        }
         
        if(successCreate){
            history(`/admin/product/${createdProduct._id}/edit`)
        }else{
            
            dispatch(listProducts('', pageNumber))
        }
    },[dispatch, history, userInfo, successDelete, successCreate, createProduct, pageNumber])

    const deleteHandler = (id) => {
       if(window.confirm('Are you Sure')){
           dispatch(deleteProduct(id))
       }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    return (
        <>
         <Row className='align-items-center'>
            <Col>
              <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                 <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                 </Button>
            </Col>
         </Row>
          {loadinDelete && <Loader/> }
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loadingCreate && <Loader/>}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
         {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
             <>
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>PRICE</th>
                         <th>CATEGORY</th>
                         <th>BRAND</th>
                     </tr>
                 </thead>
                 <tbody>
                     {products.map(product => (
                         <tr key={product._id}>
                             <td>{product.name}</td>
                             <td>${product.price}</td>
                             <td>{product.category}</td>
                             <td>{product.brand}</td>
                             <td>
                                 <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                   <Button variant='light' className='btn-sm'>
                                       <i className='fas fa-edit'></i>
                                   </Button>
                                 </LinkContainer>
                                 <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                 <i className='fas fa-trash'></i>
                                 </Button>
                             </td>

                         </tr>
                     ))}
                 </tbody>
             </Table>

              <Paginate pages={pages} page={page} isAdmin={true} />
             </>
         )}
            
        </>
    )
}

export default ProductListScreen
