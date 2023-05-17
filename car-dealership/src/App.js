import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState, useHistory } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar';
import Home from './pages/home/Home';
import CarsList from './pages/cars/CarsList';
import SingleCar from './pages/cars/SingleCar';
import AddCar from './pages/cars/AddCar';
import CarStock from './pages/cars/CarStock';


function App() {
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/cars" element={<CarsList />}></Route>
        <Route exact path="/cars/:carId" element={<SingleCar />}></Route>
        <Route exact path="/cars/new" element={<AddCar />}></Route>
        <Route exact path="/stock/:stockId" element={<CarStock />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
