import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
