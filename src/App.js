import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import OAuth2SignUp from "./pages/auth/OAuth2SignUp";
import OAuth2Login from "./pages/auth/OAuth2Login";
import Error404 from "./pages/common/Error404";
import PrivateRoute from "./components/common/PrivateRoute";
import Error403 from "./pages/common/Error403";
import LibraryList from "./pages/LibraryList";
import MyPage from "./pages/auth/MyPage";
import SearchByISBN from "./pages/SearchByISBN";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/error/403" element={<Error403/>}/>
          <Route path="/" element={<Main/>}/>
          {/*사용자 관련*/}
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/login/email" element={<EmailLogin/>}/>
          <Route path="/oauth2/sign-up" element={<OAuth2SignUp/>}/>
          <Route path="/oauth2/login" element={<OAuth2Login/>}/>
          <Route path="/mypage" element={<PrivateRoute element={MyPage}/>}/>
          {/*도서 검색 관련*/}
          <Route path="/book/detail/:isbn" element={<LibraryList/>}/>
          <Route path="/search/isbn" element={<SearchByISBN/>}/>
          {/*도서 요청 관련*/}
          <Route path="/requestBook" element={<PrivateRoute element={RequestBook}/>} />
          <Route path="/requestBook/list" element={<PrivateRoute element={RequestBookList}/>} />
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
