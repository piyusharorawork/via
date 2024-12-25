import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import HomePage from "./pages/home/home.page.tsx";
import EditorPage from "./pages/editor/editor.page.tsx";
import { Navbar } from "./navbar/navbar.component.tsx";

const Layout = () => {
  return (
    <section id="reelify" className="h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="grow">
        <Outlet />
      </main>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="editor" element={<EditorPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
