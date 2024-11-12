import React, { useState } from "react";
import { Modal } from "./Modal";
import { Box, CircularProgress } from "@mui/material";
import { TextField } from "../text-field";
import { Button } from "../button";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { blogsCollection } from "../../firebase";
import { useTagContext, useUserContext } from "../../context";
import { CreateTagModal } from "./CreateTagModal";

export const CreateBlogModal = (props) => {
  const { open, handleClose } = props;
  const { currentUser } = useUserContext();
  const { tags, tagLoading } = useTagContext();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const handleOpenTag = () => setOpenTag(true);
  const handleCloseTag = () => setOpenTag(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      blogData.content === "" ||
      blogData.description === "" ||
      blogData.title === ""
    ) {
      alert("Please fill all the fields!");
    } else {
      setLoading(true);

      await addDoc(blogsCollection, {
        userId: currentUser.uid,
        title: blogData.title,
        description: blogData.description,
        content: blogData.content,
        createdAt: serverTimestamp(),
      });

      setBlogData({
        title: "",
        description: "",
        content: "",
      });

      handleClose();
      setLoading(false);
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      {tagLoading || loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h2 style={{ margin: 0 }}>Create Blog</h2>
          <TextField
            type="text"
            name="title"
            placeholder="Title..."
            value={blogData.title}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="description"
            placeholder="Description..."
            value={blogData.description}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="content"
            placeholder="Content..."
            value={blogData.content}
            onChange={handleChange}
          />
          {tags.length === 0
            ? "Add new tag"
            : tags.map((tag, index) => <div key={index}>{tag.name} </div>)}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <CreateTagModal open={openTag} handleClose={handleCloseTag} />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleOpenTag}>Add Tag</Button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Create</Button>
            </div>
          </Box>
        </Box>
      )}
    </Modal>
  );
};
