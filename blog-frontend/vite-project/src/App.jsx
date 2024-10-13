import React, { useEffect, useState } from "react";
import BlogList from "./Bloglist/Bloglist";
import LocationDisplay from "./Locationdisplay";
import { fetchLocation } from "./Api/api";
import { blogPosts } from "./Mockdata/Mock";
import Navbar from "./Pages/Homepage/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Creatorsection from "./Pages/Creatorsection/Creatorsection" ;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/creatorsection" element={<Creatorsection />} />
    </Routes>
  );
};

export default App;
