import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';


import { Home, SingleProduct, Cart,Products } from './pages';


function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/'  element={<Home />}/>
          <Route exact path='/cart' element={<Cart />}/>
          <Route exact path='/products' element={<Products />}/>
          <Route exact path='/products/:id' element={<SingleProduct />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
