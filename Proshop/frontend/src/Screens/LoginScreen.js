import React, {useState,useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Message  from '../Components/message';
import  Loader  from '../Components/Loader';
import { FormContainer } from '../Components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const  {loading, error, userInfo} = userLogin;
    const location = useLocation();
    const history = useNavigate();  
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo){
          history(redirect)
        }
    },[userInfo,redirect])
     
    const submitHandler =  (e) => {
        e.preventDefault();
        dispatch(login(email,password))
       }
        return (
            <>
                <h1>Sign In</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) =>setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        SIGN IN 
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                    New Customer?{''} 
                    <Link to={redirect ? `/register?redirect=${redirect}`  : '/register'}>
                        Register Here
                    </Link>
                    </Col>
                </Row>
            </>
        )
}

export default LoginScreen
