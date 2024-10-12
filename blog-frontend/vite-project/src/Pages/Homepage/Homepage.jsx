import React from "react";
import Navbar from "./Navbar/Navbar";
import BlogList from "../../Bloglist/Bloglist";
import LocationDisplay from "../../Locationdisplay";
import { blogPosts } from "../../Mockdata/Mock";
import { fetchLocation } from "../../Api/api";
const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <BlogList blogs={blogPosts} />
      <LocationDisplay />
    </div>
  );
};
export default Homepage;
