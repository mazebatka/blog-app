import React from "react";
import { useParams } from "react-router-dom";
import { useBlogContext } from "../../context";
import { CircularProgress } from "@mui/material";
import { Footer, Header } from "../../components";
import "./BlogPage.css";

export const BlogPage = () => {
  const { id } = useParams();

  const { blogs, blogsLoading } = useBlogContext();

  const singleBlog = blogs.find((blog) => blog.blogId === id);

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
          <h3>{singleBlog.user.displayName}</h3>
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
      </div>

      <Footer />
    </div>
  );
};
