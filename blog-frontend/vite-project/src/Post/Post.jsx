import React from "react";
import "./Post.css";

const Post = ({ blog }) => {
  return (
    <div className="post-container">
      <h2 className="post-title">{blog.title}</h2>
      <p className="post-location">
        Location: {blog.city}, {blog.country}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="post-content"
      />

      <div className="post-media">
        {blog.media.map((item, index) => (
          <div key={index} className="post-media-item">
            {item.type === "image" ? (
              <img src={item.url} alt="Blog Media" className="post-image" />
            ) : (
              <video controls className="post-video">
                {/* Use multiple source elements to support different formats */}
                <source src={item.url} type="video/mp4" />
                <source
                  src={item.url.replace(".mp4", ".webm")}
                  type="video/webm"
                />
                {/* Fallback message */}
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
