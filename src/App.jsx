import "./App.css";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import ContactPage from './components/ContactPage'
import AboutPage from "./components/AboutPage";
import Menu from './components/Menu';
import Cart from "./components/Cart";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/menu" element={<Menu/>}/>
      
      <Route path="/login" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path="/cart" element={
        <PrivateRoute>
          <Cart/>
        </PrivateRoute>}/>
    </Routes>
  );
}

export default App;
