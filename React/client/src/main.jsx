import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/AppRoute";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer position="top-right" z-index="9999" />
  </>
);
