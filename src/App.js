import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import RequestBook from "./pages/RequestBook";
import BookTradeList from "./pages/trade/BookTradeList";
import BookTradeDetail from "./pages/trade/BookTradeDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./styles/signup.css"
import BookTradeEdit from "./pages/trade/BookTradeEdit";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/requestBook" element={<RequestBook/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/trade/list" element={<BookTradeList />} />
          <Route path="/trade/:tradeId" element={<BookTradeDetail />} />
          <Route path="/trade/edit/" element={<BookTradeEdit /> } />
          <Route path="/trade/edit/:tradeId" element={<BookTradeEdit /> } />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
