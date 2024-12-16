import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogContext } from "../../context";
import { CircularProgress } from "@mui/material";
import {
  Button,
  DeleteBlogModal,
  UpdateBlogModal,
  Footer,
  Header,
} from "../../components";
import "./BlogPage.css";

export const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openDeleteBlog, setOpenDeleteBlog] = useState(false);
  const [openUpdateBlog, setUpdateBlog] = useState(false);
  const handleOpenDeleteBlog = () => setOpenDeleteBlog(true);
  const handleCloseDeleteBlog = () => setOpenDeleteBlog(false);
  const handleOpenUpdateBlog = () => setUpdateBlog(true);
  const handleCloseUpdateBlog = () => setUpdateBlog(false);

  const { blogs, blogsLoading } = useBlogContext();

  const singleBlog = blogs.find((blog) => blog.blogId === id);

  useEffect(() => {
    if (!blogsLoading && !singleBlog) {
      navigate("/404", { replace: true });
    }
  }, [blogsLoading, singleBlog, navigate]);

  if (blogsLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!singleBlog) return null;

  return (
    <div>
      <Header />

      <div id="blog-container">
        <h1 style={{ width: "800px", marginTop: "40px", marginBottom: "40px" }}>
          {singleBlog.title}
        </h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h3>{singleBlog.user?.displayName}</h3>
          <p>
            {singleBlog.createdAt.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <img src={singleBlog.imageURL} width={800} alt={singleBlog.title} />

        <p style={{ marginTop: "40px" }}>{singleBlog.content}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <Button style={{ width: "120px" }} onClick={handleOpenUpdateBlog}>
            Update
          </Button>
          <Button style={{ width: "120px" }} onClick={handleOpenDeleteBlog}>
            Delete
          </Button>
        </div>
      </div>

      <Footer />

      <DeleteBlogModal
        open={openDeleteBlog}
        handleClose={handleCloseDeleteBlog}
        blogId={id}
      />
      <UpdateBlogModal
        open={openUpdateBlog}
        handleClose={handleCloseUpdateBlog}
        blog={singleBlog}
      />
    </div>
  );
};
