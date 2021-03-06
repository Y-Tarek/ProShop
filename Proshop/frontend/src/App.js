import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen  from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderListScreen from './Screens/OrderListScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';

 
const App = () =>  {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
          <Container>
            <Routes>
            <Route path = "/" element= {<HomeScreen/>} exact></Route>
            <Route path = "/search/:keyword" element= {<HomeScreen/>}exact></Route>
            <Route path = "/register" element= {<RegisterScreen/>} exact></Route>
            <Route path = "/shipping" element= {<ShippingScreen/>} exact></Route>
            <Route path = "/placeorder" element= {<PlaceOrderScreen/>} exact></Route>
            <Route path = "/order/:id" element= {<OrderScreen/>} exact></Route>
            <Route path = "/admin/orderlist" element= {<OrderListScreen/>} exact></Route>
            <Route path = "/payment" element= {<PaymentScreen/>} exact></Route>
            <Route path = "/product/:id" element= {<ProductScreen/>} ></Route>
            <Route path = "/login" element= {<LoginScreen/>} ></Route>
            <Route path = "/profile" element= {<ProfileScreen/>} ></Route>
            <Route path = "/admin/user/:id/edit" element= {<UserEditScreen/>} ></Route>
            <Route path = "/admin/userlist" element= {<UserListScreen/>} ></Route>
            <Route path = "/admin/productlist" element= {<ProductListScreen/>} ></Route>
            <Route path = "/admin/productlist/:pageNumber" element= {<ProductListScreen/>} exact></Route>
            <Route path = "/admin/search/:keyword/productlist/:pageNumber" element= {<ProductListScreen/>} exact></Route>
            <Route path = "/admin/product/:id/edit" element= {<ProductEditScreen/>} ></Route>
            <Route path = "/cart" element= {<CartScreen/>} ></Route>
            <Route path = "/cart/:id" element= {<CartScreen/>} ></Route>
            <Route path = "/page/:pageNumber" element= {<HomeScreen/>} exact></Route>
            <Route path = "/search/:keyword/page/:pageNumber" element= {<HomeScreen/>} exact></Route>
            
            </Routes>
         </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
