import React, { useEffect, useState } from "react";
import BlogList from "./Bloglist/Bloglist";
import LocationDisplay from "./Locationdisplay";
import { fetchLocation } from "./Api/api";
import { blogPosts } from "./Mockdata/Mock";
import Navbar from "./Pages/Homepage/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} >
      </Route>
    </Routes>
  );
};

export default App;
