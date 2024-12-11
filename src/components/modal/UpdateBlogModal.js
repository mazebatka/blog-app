import React, { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Modal } from "./Modal";
import { TextField } from "../text-field";
import { Button } from "../button";
import { blogsCollection } from "../../firebase";
import { useTagContext } from "../../context";
import { MenuItem, Select } from "@mui/material";

export const UpdateBlogModal = (props) => {
  const { open, handleClose, blog } = props;
  const { tags } = useTagContext();

  const [blogData, setBlogData] = useState({
    title: blog.title,
    description: blog.description,
    content: blog.content,
    tagId: blog.tagId,
    imageURL: blog.imageURL,
    userId: blog.userId,
    createdAt: blog.createdAt,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleUpdate = async () => {
    if (
      blogData.title === "" ||
      blogData.description === "" ||
      blogData.content === "" ||
      blogData.tagId === ""
    ) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const blogDocRef = doc(blogsCollection, blog.blogId);
      await setDoc(blogDocRef, {
        ...blogData,
        updatedAt: serverTimestamp(),
      });
      handleClose();
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    }

    setLoading(false);
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2>Update Blog</h2>
        <TextField
          type="text"
          name="title"
          placeholder="Title"
          value={blogData.title}
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="description"
          placeholder="Description"
          value={blogData.description}
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="content"
          placeholder="Content"
          value={blogData.content}
          onChange={handleChange}
        />
        <Select
          value={blogData.tagId}
          name="tagId"
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
          displayEmpty
          sx={{
            height: "37px",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          {tags?.map((tag) => (
            <MenuItem value={tag.tagId} key={tag.tagId}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
        <div>
          <img src={blogData.imageURL} height={100} alt={blogData.title} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
