import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/blogs" element={<div>All Blog Page</div>} />
        <Route path="/blogs/:id" element={<div>Home Page</div>} />
        <Route path="/contact-us" element={<div>Contact Page</div>} />
        <Route path="/404" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
