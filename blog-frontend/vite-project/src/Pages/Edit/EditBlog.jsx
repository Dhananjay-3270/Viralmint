import React, { useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams for accessing URL parameters
import "./EditBlog.css"; // Import your CSS file
import JoditEditor from "jodit-react";
import { config } from "../../config";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const EditBlog = () => {
  const history = useNavigate();
  const editor = useRef(null);
  const { id } = useParams(); // Get blog_id from URL
  const token = localStorage.getItem("token");
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    media: [],
  });

  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/blog/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setBlog(response.data); // Set the fetched blog data
  //     } catch (error) {
  //       console.error("Error fetching blog:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlog();
  // }, [id, token]);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file); // Create a temporary URL for the uploaded file
    setBlog((prev) => ({
      ...prev,
      media: [...prev.media, { type: "image", url }],
    }));
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file); // Create a temporary URL for the uploaded file
    setBlog((prev) => ({
      ...prev,
      media: [...prev.media, { type: "video", url }],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${config.endpoint}/api/edit/${id}`,
        blog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        enqueueSnackbar(response.data.message, { variant: "success" });
        history("/creatorsection");
      }

      // Optionally, redirect or show a success message
    } catch (error) {
      enqueueSnackbar(error, { variant: "errror" });
      console.error("Error updating blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-post-form">
      <h2>Edit Blog Post</h2>
      <input
        type="text"
        placeholder="Enter Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        required
      />
      <JoditEditor
        ref={editor}
        value={blog.content}
        onChange={(e) => setBlog({ ...blog, content: e })}
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
            setBlog((prev) => ({
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
            setBlog((prev) => ({
              ...prev,
              media: [...prev.media, { type: "video", url: e.target.value }],
            }))
          }
        />
      </div>

      {/* Media Previews */}
      <div>
        {blog.media.map((item, index) => (
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

      <button type="submit">Update Blog</button>
    </form>
  );
};

export default EditBlog;
