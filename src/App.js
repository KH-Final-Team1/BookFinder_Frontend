import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import RequestBook from "./pages/RequestBook";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUpForm";
import "./styles/signup.css"

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/requestBook" element={<RequestBook/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUpForm/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
