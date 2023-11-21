import React, { useState, useRef }  from 'react'
import './App.css'
//import Row from './Components/Row/Row'
//import requests from './request'
import HomeScreen from "./components/homeScreen/homeScreen";
//import Banner from './Components/Banner/Banner'
//import Navbar from './Components/Navbar/Navbar'
import Login from "./components/registration/login";
//import Profile from "./components/profile/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function App() {
	//const { user } = useSelector((state) => state.user);
	//const dispatch = useDispatch();
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

