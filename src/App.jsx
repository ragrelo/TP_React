import React, { useState, useRef }  from 'react'
import './App.css'
import HomeScreen from "./components/homeScreen/homeScreen";
import Login from "./components/registration/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user = true;

   return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </Router>
    </div>
  )
}

export default App

