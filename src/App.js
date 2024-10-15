import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  BlogPage,
  BlogsPage,
  HomePage,
  NotFoundPage,
  ContactUsPage,
} from "./pages";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
