// BlogEditor.jsx
import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./BlogEditor.css"; // Import your CSS file

const BlogEditor = () => {
  const token = localStorage.getItem("token");
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    media: [],
    location: {
      city: "",
      country: "",
    },
  });

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setNewBlog((prev) => ({
        ...prev,
        media: [...prev.media, { type: "image", src: fileURL }],
      }));
    }
  };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setNewBlog((prev) => ({
        ...prev,
        media: [...prev.media, { type: "video", src: fileURL }],
      }));
    }
  };

  const handleSubmit = async (event) => {
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
              media: [...prev.media, { type: "image", src: e.target.value }],
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
              media: [...prev.media, { type: "video", src: e.target.value }],
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
                  src={item.src}
                  alt="Image Preview"
                  style={{ maxWidth: "100%" }}
                />
              </p>
            ) : (
              <p>
                Video Preview:{" "}
                <video src={item.src} controls style={{ maxWidth: "100%" }} />
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
