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
import StockList from './pages/cars/StockList';
import AddStock from './pages/cars/AddStock';
import AddTestDrive from './pages/testdrives/AddTestDrive';
import TestDrive from './pages/testdrives/TestDrive';
import AddUser from './pages/users/AddUser';
import User from './pages/users/User';
import UsersList from './pages/users/UsersList';


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
        <Route exact path="/stock" element={<StockList />}></Route>
        <Route exact path="/stock/new" element={<AddStock />}></Route>
        <Route exact path="/testdrive/new" element={<AddTestDrive />}></Route>
        <Route exact path="/testdrive/:testDriveId" element={<TestDrive />}></Route>
        <Route exact path="/users/new" element={<AddUser />}></Route>
        <Route exact path="/users/:userId" element={<User />}></Route>
        <Route exact path="/users" element={<UsersList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
