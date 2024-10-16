import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { fetchLocation } from "../Api/api"; // Ensure this is correctly imported
import "./Bloglist.css";
import { config } from "../config";
import { enqueueSnackbar } from "notistack";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Location, setlocation] = useState("");
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch the user's location
        const location = await fetchLocation(); // Fetch city dynamically
        const { city, region, country } = location;
        setlocation({ city, region, country });
        // Fetch blog posts based on the user's city
        const response = await fetch(
          `${config.endpoint}/posts/${location.city}`
        );

        // Check if response is ok
        if (response.status == 200) {
          enqueueSnackbar(`Presenting you blogs from ${city}`, {
            variant: "success",
          });
        }

        if (!response.ok) {
          enqueueSnackbar(`Failed to fetch posts from  ${city}`, {
            variant: "error",
          });
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setBlogs(data); // Set the fetched blogs
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetch is done
      }
    };

    fetchBlogs(); // Call the function to fetch blogs
  }, []); // Empty dependency array to run only on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-list-container">
      {blogs.map((blog) => (
        <Post key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
