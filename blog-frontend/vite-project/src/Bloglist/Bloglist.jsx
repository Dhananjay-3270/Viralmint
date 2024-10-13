import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { fetchLocation } from "../Api/api"; // Ensure this is correctly imported

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch the user's location
        const city = await fetchLocation(); // Fetch city dynamically

        // Fetch blog posts based on the user's city
        const response = await fetch(
          `http://localhost:5000/posts/${city.city}`
        );

        // Check if response is ok
        if (!response.ok) {
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
    <div>
      {blogs.map((blog) => (
        <Post key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
