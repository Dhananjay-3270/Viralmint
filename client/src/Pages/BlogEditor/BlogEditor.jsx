import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios
import "./BlogEditor.css"; // Import your CSS file
import { fetchLocation } from "../../Api/api";
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe SDK
import JoditEditor from "jodit-react";
import { config } from "../../config";

const BlogEditor = () => {
  const editor = useRef(null);
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

  const [imageURL, setImageURL] = useState(""); // Separate state for image URL input
  const [videoURL, setVideoURL] = useState(""); // Separate state for video URL input

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

  const handleAddImageURL = () => {
    if (imageURL) {
      setNewBlog((prev) => ({
        ...prev,
        media: [...prev.media, { type: "image", url: imageURL }],
      }));
      setImageURL(""); // Clear the input field after adding
    }
  };

  const handleAddVideoURL = () => {
    if (videoURL) {
      setNewBlog((prev) => ({
        ...prev,
        media: [...prev.media, { type: "video", url: videoURL }],
      }));
      setVideoURL(""); // Clear the input field after adding
    }
  };

  const proceedtopayment = async (event) => {
    event.preventDefault();
    const stripePromise = loadStripe(
      "pk_test_51Q9rcM04CK4t2L72WQwmGHHL43fJdCxyyTSRI2Vbr6rgl2a4LkqNA27lH57x1hFK6gYGZeehfmkSx1PkCRoSqL8x00prf1zkKb"
    );
    const stripe = await stripePromise;
    try {
      // Create a checkout session in the backend
      const response = await axios.post(
        `${config.endpoint}/api/create-checkout-session`,
        newBlog, // Send newBlog directly, no need for blogData wrapping
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with token
          },
        }
      );

      const sessionId = response.data.id; // Extract session ID from the response

      // Redirect the user to the Stripe checkout page
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error(result.error.message); // Log any errors from Stripe checkout redirection
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error); // Log errors in the try block
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("From FE", newBlog);

    try {
      const response = await axios.post(
        `${config.endpoint}:5000/api/addblogs`,
        newBlog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Blog submitted:", response.data);

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
    <>
      <form onSubmit={proceedtopayment} className="blog-post-form">
        <h2>Whats going in your mind?</h2>

        <input
          type="text"
          placeholder="Enter Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          required
        />

        <JoditEditor
          ref={editor}
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e })}
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
            placeholder="Enter Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)} // Update image URL state
          />
          <button type="button" onClick={handleAddImageURL}>
            Add Image URL
          </button>
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
            placeholder="Enter Video URL"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)} // Update video URL state
          />
          <button type="button" onClick={handleAddVideoURL}>
            Add Video URL
          </button>
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
        {/* <button type="submit" disabled={true}>Submit This button is to submit blog without payment</button> */}
        <button type="submit">Proceed to Add Blog</button>
      </form>

      {/* Location Display Box */}
      {location && (
        <div className="location-box">
          <h4>Your Location:</h4>
          <p>
            {location.city}, {location.country}
          </p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
   
    </>
  );
};

export default BlogEditor;
