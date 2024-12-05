import React, { useState } from "react";
import { Button, CreateBlogModal, Header } from "../../components";
import "./BlogsPage.css";

export const BlogsPage = () => {
  const [openBlog, setOpenBlog] = useState(false);

  const handleOpenBlog = () => setOpenBlog(true);
  const handleCloseBlog = () => setOpenBlog(false);

  return (
    <div>
      <Header />

      <div id="blogs-container">
        <div id="create-blog">
          <Button style={{ width: "120px" }} onClick={handleOpenBlog}>
            Create Blog
          </Button>
        </div>
      </div>

      <CreateBlogModal open={openBlog} handleClose={handleCloseBlog} />
    </div>
  );
};
