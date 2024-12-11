import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { blogsCollection } from "../../firebase";
import { useUserContext, useBlogContext } from "../../context";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export const BlogList = () => {
  const { currentUser } = useUserContext();
  const { blogs } = useBlogContext();

  const handleDeleteClick = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(blogsCollection, blogId));
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete the blog.");
      }
    }
  };
  console.log(blogs);
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
          <p>By: {blog.userId === currentUser?.uid ? "You" : "Another User"}</p>
          {blog.userId === currentUser?.uid && (
            <IconButton onClick={() => handleDeleteClick(blog.blogId)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}
    </div>
  );
};
