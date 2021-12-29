import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './message';
import { topProducts } from '../actions/productActions';

const ProductCarousel = () => {
    const dispatch =  useDispatch();
    const productTopRated = useSelector(state => state.productTopRated);
    const {loading, error, products} = productTopRated;
    useEffect(() => {
        dispatch(topProducts())
    }, [dispatch])
    return loading ? <Loader/> : error? <Message variant='danger'>{error}</Message> :
    (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image className="d-block mx-auto" src={product.image} alt={product.name} fluid></Image>
                         <Carousel.Caption className='carousel-caption'>
                             <h2>
                                 {product.name} ({product.price})
                             </h2>
                         </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
