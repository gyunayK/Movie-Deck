import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/AppRoute";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      theme="dark"
      position="top-right"
      hideProgressBar="true"
      autoClose="1500"
    />
  </>
);
