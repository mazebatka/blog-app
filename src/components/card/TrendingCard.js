import React from "react";
import { useNavigate } from "react-router-dom";

export const TrendingCard = (props) => {
  const { blog } = props;
  const navigate = useNavigate();
  const defaultImageURL =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/665fa9bf-e939-4ad5-82fb-f50ddaf3be07/dglqy6m-77a304bf-8522-4125-9139-c3315bbcf63d.jpg/v1/fill/w_1024,h_683,q_75,strp/absolute_reality__stunning_and_authentic_nature_by_uar05uba06_dglqy6m-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY2NWZhOWJmLWU5MzktNGFkNS04MmZiLWY1MGRkYWYzYmUwN1wvZGdscXk2bS03N2EzMDRiZi04NTIyLTQxMjUtOTEzOS1jMzMxNWJiY2Y2M2QuanBnIiwiaGVpZ2h0IjoiPD02ODMiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC82NjVmYTliZi1lOTM5LTRhZDUtODJmYi1mNTBkZGFmM2JlMDdcL3VhcjA1dWJhMDYtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.F9WlzH0_apC1xNwWHeQ7jfUzmL75emHIRie_NBbGms0";
  return (
    <div
      onClick={() => navigate(`/blogs/${blog.blogId}`)}
      style={{
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "280px",
          height: "320px",
          borderRadius: "12px",
          backgroundImage: `url(${blog.imageURL || defaultImageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "brightness(60%)",
        }}
      />

      <div
        style={{
          color: "white",
          position: "absolute",
          left: 25,
          top: 200,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingRight: "25px",
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: "#4B6BFB",
              borderRadius: "6px",
              padding: "4px 10px",
            }}
          >
            {blog.tag.name}
          </span>
        </div>

        <div
          style={{
            height: "70px",
            overflow: "hidden",
          }}
        >
          <h2 style={{ fontSize: "18px" }}>{blog.title}</h2>
        </div>
      </div>
    </div>
  );
};
