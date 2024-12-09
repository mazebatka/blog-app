import React, { useState, useEffect } from "react";
import { doc, deleteDoc, getDocs } from "firebase/firestore";
import { blogsCollection } from "../../firebase"; // Firebase collection reference
import { useAuth } from "../../context/AuthContext"; // Current user context

export const BlogList = () => {
  const { currentUser } = useAuth(); // Get the current user
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from Firestore
  const fetchBlogs = async () => {
    const querySnapshot = await getDocs(blogsCollection);
    const blogsData = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Blog data
    }));
    setBlogs(blogsData);
  };

  // Delete a blog
  const handleDeleteClick = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(blogsCollection, blogId));
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId)); // Remove blog from state
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete the blog.");
      }
    }
  };

  // Load blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <small>
            By: {blog.userId === currentUser.uid ? "You" : "Another User"}
          </small>
          {blog.userId === currentUser.uid && (
            <button onClick={() => handleDeleteClick(blog.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};
