import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatorSection = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    media: [],
  });

  // useEffect(() => {
  //   // Fetch user details and blogs
  //   const fetchUserDetails = async () => {
  //     try {
  //       const userResponse = await axios.get("http://localhost:5000/api/user");
  //       setUser(userResponse.data);
  //       setBlogs(userResponse.data.blogs);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);

  // const handleAddBlog = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/blogs", newBlog);
  //     setBlogs([...blogs, response.data]); // Add new blog to the list
  //   } catch (error) {
  //     console.error("Error adding blog:", error);
  //   }
  // };

  // const handleDeleteBlog = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/blogs/${id}`);
  //     setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the deleted blog
  //   } catch (error) {
  //     console.error("Error deleting blog:", error);
  //   }
  // };

  return (
    <div>
Creators section
    </div>
  );
};

export default CreatorSection;




// <h1>Welcome, {user?.username}</h1>
// <h2>Your Blogs</h2>
// <ul>
//   {blogs.map((blog) => (
//     <li key={blog._id}>
//       <h3>{blog.title}</h3>
//       <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
//       {/* Add an edit button here if needed */}
//     </li>
//   ))}
// </ul>

// <h2>Add New Blog</h2>
// <form
//   onSubmit={(e) => {
//     e.preventDefault();
//     handleAddBlog();
//   }}
// >
//   <input
//     type="text"
//     placeholder="Blog Title"
//     value={newBlog.title}
//     onChange={(e) =>
//       setNewBlog({ ...newBlog, title: e.target.value })
//     }
//     required
//   />
//   <textarea
//     placeholder="Blog Content"
//     value={newBlog.content}
//     onChange={(e) =>
//       setNewBlog({ ...newBlog, content: e.target.value })
//     }
//     required
//   />
//   <button type="submit">Add Blog</button>
// </form>