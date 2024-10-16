import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatorSection.css"; // Import your CSS file
import { Link } from "react-router-dom";
import { config } from "../../config";

const CreatorSection = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`${config.endpoint}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
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

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${config.endpoint}/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              {blog.media.length > 0 && (
                <div className="media-container">
                  {blog.media.map((media) => (
                    <div key={media._id} className="media-item">
                      {media.type === "image" ? (
                        <img
                          src={media.url}
                          alt="Blog Media"
                          className="media-image"
                        />
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
              <div className="button-group">
                <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                <Link to={`/creatorsection/edit/${blog._id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </ul>

      <h2>Add New Blog</h2>
      <Link to="/creatorsection/add">
        <button type="submit">Add Blog</button>
      </Link>
    </div>
  );
};

export default CreatorSection;
