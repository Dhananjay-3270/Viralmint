// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./Context/Usercontext"; // Adjust the path as needed
import Navbar from "./Pages/Homepage/Navbar/Navbar"; // Ensure the import path is correct
import Homepage from "./Pages/Homepage/Homepage";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Creatorsection from "./Pages/Creatorsection/Creatorsection";
import BlogEditor from "./Pages/BlogEditor/BlogEditor";

const App = () => {
  return (
    <UserProvider>
      <Navbar /> {/* Navbar is rendered on every route */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creatorsection" element={<Creatorsection />} />
        <Route path="/creatorsection/edit" element={<BlogEditor />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
