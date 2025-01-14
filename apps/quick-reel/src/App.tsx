import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Navbar } from "@/components/features/navbar";
import HomePage from "./pages/home/home.page";
import VideoAnalyserPage from "./pages/video-analyser/video-analyser.page";
import TemplatePage from "./pages/template/template.page";

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
          <Route path="/template/:id" element={<TemplatePage />} />
        </Route>
        <Route path="/video-analyser" element={<VideoAnalyserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
