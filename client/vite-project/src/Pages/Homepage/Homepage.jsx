import React from "react";
import Navbar from "./Navbar/Navbar";
import BlogList from "../../Bloglist/Bloglist";
import LocationDisplay from "../../Locationdisplay";

import "./Homepage.css"
const Homepage = () => {
  return (
    <div className="homepage-container">
     
      <BlogList  />
      <LocationDisplay />
    </div>
  );
};
export default Homepage;
