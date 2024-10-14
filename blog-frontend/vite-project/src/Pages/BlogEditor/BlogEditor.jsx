// BlogEditor.jsx
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./BlogEditor.css"; // Import your CSS file
import { fetchLocation } from "../../Api/api";
const BlogEditor = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    city: "",
    country: "",
    media: [],
  });
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    try {
      const data = await fetchLocation();
      if (data) {
        const { city, region, country } = data;
        setLocation({ city, region, country });
        setNewBlog((prev) => ({
          ...prev,

          city,
          country,
        }));
      }
    } catch (error) {
      setError("Could not retrieve location");
      console.error("Error fetching location:", error);
    }
  };
  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setNewBlog((prev) => ({
        ...prev,
        media: [...prev.media, { type: "image", url: fileURL }],
      }));
    }
  };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setNewBlog((prev) => ({
        ...prev,
        media: [...prev.media, { type: "video", url: fileURL }],
      }));
    }
  };

  const handleSubmit = async (event) => {
    console.log("From FE", newBlog);
    event.preventDefault();

    try {
      // Make an API call to submit the new blog data
      const response = await axios.post(
        "http://localhost:5000/api/addblogs",
        newBlog,

        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log("Blog submitted:", response.data);

      // Reset the form after submission if needed
      setNewBlog({
        title: "",
        content: "",
        media: [],
        location: {
          city: "",
          country: "",
        },
      });
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-post-form">
      <h2>Add New Blog Post</h2>
      <input
        type="text"
        placeholder="Enter Title"
        value={newBlog.title}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Enter Content"
        value={newBlog.content}
        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        required
      />

      {/* Image Section */}
      <h3>Image Upload</h3>
      <div>
        <label htmlFor="imageFile">Upload Image:</label>
        <input
          type="file"
          id="imageFile"
          accept="image/*"
          onChange={handleImageFileChange}
        />
        <input
          type="url"
          placeholder="Or Enter Image URL"
          onChange={(e) =>
            setNewBlog((prev) => ({
              ...prev,
              media: [...prev.media, { type: "image", url: e.target.value }],
            }))
          }
        />
      </div>

      {/* Video Section */}
      <h3>Video Upload</h3>
      <div>
        <label htmlFor="videoFile">Upload Video:</label>
        <input
          type="file"
          id="videoFile"
          accept="video/*"
          onChange={handleVideoFileChange}
        />
        <input
          type="url"
          placeholder="Or Enter Video URL"
          onChange={(e) =>
            setNewBlog((prev) => ({
              ...prev,
              media: [...prev.media, { type: "video", url: e.target.value }],
            }))
          }
        />
      </div>

      {/* Media Previews */}
      <div>
        {newBlog.media.map((item, index) => (
          <div key={index}>
            {item.type === "image" ? (
              <p>
                Image Preview:{" "}
                <img
                  src={item.url}
                  alt="Image Preview"
                  style={{ maxWidth: "100%" }}
                />
              </p>
            ) : (
              <p>
                Video Preview:{" "}
                <video src={item.url} controls style={{ maxWidth: "100%" }} />
              </p>
            )}
          </div>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogEditor;
