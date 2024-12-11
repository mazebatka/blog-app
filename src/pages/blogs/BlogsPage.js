import React, { useState } from "react";
import { Button, CreateBlogModal, Header, Card } from "../../components";
import { useBlogContext } from "../../context";
import "./BlogsPage.css";

export const BlogsPage = () => {
  const [openBlog, setOpenBlog] = useState(false);
  const { blogs } = useBlogContext();

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

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            marginTop: "60px",
          }}
        >
          {blogs.map((blog, index) => (
            <div key={index}>
              <Card blog={blog} />
            </div>
          ))}
        </div>
      </div>

      <CreateBlogModal open={openBlog} handleClose={handleCloseBlog} />
    </div>
  );
};
