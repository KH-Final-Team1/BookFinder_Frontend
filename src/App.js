import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import Footer from "./components/common/Footer";
import RequestBook from "./pages/RequestBook";
import BookTradeList from "./pages/trade/BookTradeList";
import BookTradeDetail from "./pages/trade/BookTradeDetail";
import Login from "./pages/auth/Login";
import EmailLogin from "./pages/auth/EmailLogin";
import SignUp from "./pages/auth/SignUp";
import "./styles/auth.css"
import BookTradeEdit from "./pages/trade/BookTradeEdit";
import RequestBookList from "./pages/RequestBookList";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          {/*사용자 관련*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/login/email" element={<EmailLogin/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          {/*도서 요청 관련*/}
          <Route path="/requestBook" element={<RequestBook/>}/>
          <Route path="/requestBook/list" element={<RequestBookList />} />
          {/*거래 관련*/}
          <Route path="/trade/list" element={<PrivateRoute element={BookTradeList} />} />
          <Route path="/trade/:tradeId" element={<PrivateRoute element={BookTradeDetail} />} />
          <Route path="/trade/edit/:tradeId" element={<PrivateRoute element={BookTradeEdit} />} />
          <Route path="/trade/edit" element={<PrivateRoute element={BookTradeEdit} />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
