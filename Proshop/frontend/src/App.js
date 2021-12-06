import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

const App = () =>  {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
          <Container>
            <Routes>
            <Route path = "/" element= {<HomeScreen/>} exact></Route>
            <Route path = "/product/:id" element= {<ProductScreen/>} ></Route>
            </Routes>
         </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
