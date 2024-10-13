import React, { useState, useEffect } from "react";
import axios from "axios";
import './CreatorSection.css'; // Import your CSS file
import { Link } from "react-router-dom";

const CreatorSection = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    media: [],
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch user details and blogs
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(userResponse.data);
        setUser(userResponse.data);
        setBlogs(userResponse.data.blogs);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleAddBlog = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/blogs", newBlog, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setBlogs([...blogs, response.data]); // Add new blog to the list
      setNewBlog({ title: "", content: "", media: [] }); // Reset new blog input
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the deleted blog
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) return <p>Loading user data...</p>; // Show loading message

  return (
    <div className="creator-section">
      <h1>Welcome, {user?.username}</h1>
      <h2>Your Blogs</h2>
      <ul>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog._id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              {blog.media.length > 0 && (
                <div className="media-container">
                  {blog.media.map((media) => (
                    <div key={media._id} className="media-item">
                      {media.type === "image" ? (
                        <img src={media.url} alt="Blog Media" className="media-image" />
                      ) : media.type === "video" ? (
                        <video controls className="media-video">
                          <source src={media.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
              {/* Add an edit button here if needed */}
            </li>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </ul>

      <h2>Add New Blog</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddBlog();
        }}
      >
       
   
        <Link to="/creatorsection/edit">
        <button type="submit">Add Blog</button>
        </Link>
      </form>
    </div>
  );
};

export default CreatorSection;
