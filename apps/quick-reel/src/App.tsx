import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Navbar } from "@/components/features/navbar";
import HomePage from "./pages/home/home.page";
import EditorPage from "./pages/editor/editor.page";
import VideoAnalyserPage from "./pages/video-analyser/video-analyser.page";

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="editor" element={<EditorPage />} />
        </Route>
        <Route path="/video-analyser" element={<VideoAnalyserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
