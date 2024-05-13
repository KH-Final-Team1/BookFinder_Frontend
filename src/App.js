import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import RequestBook from "./pages/RequestBook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./styles/signup.css"
import BookTradeList from "./pages/BookTradeList";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/requestBook" element={<RequestBook/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/" element={<Main />} />
          <Route path="/requestBook" element={<RequestBook />} />
          <Route path="/tradeList" element={<BookTradeList />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
