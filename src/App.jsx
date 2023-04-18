import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Test2 from './Pages/test2';
import Calls from './Pages/Calls';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test2 />} />
        <Route path="/calls" element={<Calls />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
