import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@via/ui/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Videos from "./pages/Videos.tsx";
import Home from "./pages/Home.tsx";
import Playground from "./pages/Playground.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/videos",
    Component: Videos,
  },
  {
    path: "/playground",
    Component: Playground,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
