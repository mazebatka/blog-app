import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import {
  TagContextProvider,
  UserContextProvider,
  BlogContextProvider,
} from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <TagContextProvider>
        <BlogContextProvider>
          <App />
        </BlogContextProvider>
      </TagContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
