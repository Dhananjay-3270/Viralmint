// src/context/UserContext.js
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const username = localStorage.getItem("username");
  useEffect(() => {
    if (username) {
      setLoggeduser(username);
    }
  }, []);
  const [loggeduser, setLoggeduser] = useState("");

  const login = (token, email, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("useremail", email);
    localStorage.setItem("username", username);
    setLoggeduser(username);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("useremail");
    setLoggeduser("");
  };

  return (
    <UserContext.Provider value={{ loggeduser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
