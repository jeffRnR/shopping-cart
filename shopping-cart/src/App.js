import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Layout from './components/Layout';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import ParentComponent from './components/ParentComponent';
import TaskBar from './components/TaskBar';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" exact element={<Layout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
