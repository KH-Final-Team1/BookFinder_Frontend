import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import RequestBook from "./pages/RequestBook";
import BookTradeList from "./pages/trade/BookTradeList";
import BookTradeDetail from "./pages/trade/BookTradeDetail";
import Login from "./pages/auth/Login";
import EmailLogin from "./pages/auth/EmailLogin";
import SignUp from "./pages/auth/SignUp";
import "./styles/auth.css"
import BookTradeEdit from "./pages/trade/BookTradeEdit";
import RequestBookList from "./pages/RequestBookList";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/requestBook" element={<RequestBook/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/login/email" element={<EmailLogin/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/trade/list" element={<BookTradeList />} />
          <Route path="/trade/:tradeId" element={<BookTradeDetail />} />
          <Route path="/trade/edit/:tradeId" element={<BookTradeEdit /> } />
          <Route path="/requestBook/list" element={<RequestBookList/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
