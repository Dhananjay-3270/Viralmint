import React from "react";
import Navbar from "./Navbar/Navbar";
import BlogList from "../../Bloglist/Bloglist";
import LocationDisplay from "../../Locationdisplay";
import { blogPosts } from "../../Mockdata/Mock";
import "./Homepage.css"
const Homepage = () => {
  return (
    <div className="homepage-container">
     
      <BlogList blogs={blogPosts} />
      <LocationDisplay />
    </div>
  );
};
export default Homepage;
