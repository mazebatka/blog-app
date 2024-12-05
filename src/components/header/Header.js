import React from "react";
import "./Header.css";
import { Logo, SearchIcon } from "../../assets";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { useUserContext } from "../../context";

import { signOutFunction } from "../../firebase";

const handleSignOut = async () => {
  await signOutFunction();
};

export const Header = () => {
  const { currentUser } = useUserContext();
  return (
    <div id="header-container">
      <Link to="/">
        <Logo />
      </Link>

      <div id="link-container">
        <Link to="/" style={{ textDecoration: "none", color: "#3B3C4A" }}>
          Home
        </Link>
        <Link to="/blogs" style={{ textDecoration: "none", color: "#3B3C4A" }}>
          Blogs
        </Link>
        <Link
          to="/contact-us"
          style={{ textDecoration: "none", color: "#3B3C4A" }}
        >
          Contact
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          direction: "row",
        }}
      >
        {currentUser ? (
          <>
            <h3>{currentUser.displayName}!</h3>
            <Button onClick={handleSignOut} style={{ width: "100px" }}>
              Sign out
            </Button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              direction: "row",
            }}
          >
            <h3> Guest!</h3>
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              Sign in!
            </Link>
          </div>
        )}
      </div>

      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search" />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};
