import React, { useState, useEffect } from "react";
import { doc, deleteDoc, getDocs } from "firebase/firestore";
import { blogsCollection } from "../../firebase";
import { useUserContext } from "../../context";
import { Button } from "../button";

export const BlogList = () => {
  const { currentUser } = useUserContext();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const querySnapshot = await getDocs(blogsCollection);
    const blogsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBlogs(blogsData);
  };

  const handleDeleteClick = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(blogsCollection, blogId));
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete the blog.");
      }
    }
  };

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
          <p>By: {blog.userId === currentUser.uid ? "You" : "Another User"}</p>
          {blog.userId === currentUser.uid && (
            <Button onClick={() => handleDeleteClick(blog.id)}>Delete</Button>
          )}
        </div>
      ))}
    </div>
  );
};
