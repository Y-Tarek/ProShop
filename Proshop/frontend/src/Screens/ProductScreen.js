import React, {useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import {Row, Col, ListGroup, Card, Button, Image, ListGroupItem} from 'react-bootstrap';
import Rating from '../Components/Rating';
import axios from 'axios';


const ProductScreen = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        const fetchProdut = async () => {
            const {data} = await axios.get(`/api/product/${params.id}`);
            setProduct(data);
        }
        fetchProdut()
    },[]);

    return (
        <>
           <Link className='btn btn-light my-3' to='/'>Go Back</Link>
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
                        <Rating value={product.rating} text={`${product.numReviews} reviewa`}/>
                     </ListGroup.Item>

                     <ListGroup.Item>
                         Price: `${product.price}`
                     </ListGroup.Item>

                     <ListGroup.Item>
                         Descreption: ${product.description}
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
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={product.countInStock ===0 }>ADD TO CART</Button>
                        </ListGroup.Item>
                    </ListGroup>
                 </Card>
               </Col>
           </Row>
        </>
    )
}

export default ProductScreen
