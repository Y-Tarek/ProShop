import React, {useState,useEffect} from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Message  from '../Components/message';
import  Loader  from '../Components/Loader';
import axios from 'axios';
import  FormContainer  from '../Components/FormContainer';
import { listProductDetails, listProducts, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productContants';
// import { USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from '../constants/userConstants';


const ProductEditScreen = props => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [image, setImage] = useState('')
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock,setCountInStock] = useState(0);
    const [descreption,setDescreption] = useState('');
    const [uploading,setUploading] = useState(false);
    
    const dispatch = useDispatch(); 
    const userLogin = useSelector(state => state.userLogin);
    const  {userInfo} = userLogin;

    const productDetails = useSelector(state => state.productDetails);
    const  {loading, error, product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const  {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate;

    const location = useLocation();
    const history = useNavigate(); 
    var params = useParams();
    var id = params.id; 
    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET});
            history('/admin/productlist')
        }else{
            if(!product.name || product._id !== id){
                dispatch(listProductDetails(id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescreption(product.descreption)
        }

      }
        
    },[dispatch, id, history, product, successUpdate])
    const submitHandler =  (e) => {
        e.preventDefault();   
           dispatch(updateProduct({
               _id: id,
               name,
               price,
               brand,
               image,
               category,
               countInStock,
               descreption
           }))
       }

       const uploadFileHandler =  async (e)=>{
         const file = e.target.files[0];
         console.log(file);
         const formData = new FormData();
         formData.append('image',file);
         setUploading(true)
          try {
            const config = {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload',formData,config);
            console.log(data);
            setImage(data);
            setUploading(false)
          } catch (error) {
              console.log(error);
              setUploading(false)
          }
       }
    return (
        <>
             <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) =>setName(e.target.value)}>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) =>setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Upload Image' value={image} onChange={(e) =>setImage(e.target.value)}>
                            </Form.Control>
                            {/* <Form.File id="image-file" type='file' label="Choose File" custom onChange={uploadFileHandler}></Form.File>
                             */}
                             <Form.Control type="file" onChange={uploadFileHandler} size="sm" />
                            {uploading && <Loader/>}
                        </Form.Group>   

                        <Form.Group controlId='brand'>
                        <Form.Label>brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) =>setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                        <Form.Label>CountInStock</Form.Label>
                            <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock} onChange={(e) =>setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) =>setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='descreption'>
                        <Form.Label>Descreption</Form.Label>
                            <Form.Control type='text' placeholder='Enter descreption' value={descreption} onChange={(e) =>setDescreption(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        

                        <Button type='submit' variant='primary'>
                            UPDATE
                        </Button>
                    </Form>
                )}
                
               
            </FormContainer>
          </>
    )
}

export default ProductEditScreen
