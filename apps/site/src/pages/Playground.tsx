import { VideoEditor } from "@via/ui/video-editor";
import { useState } from "react";

export default function Playground() {
  const [recording, setRecording] = useState(false);

  return (
    <section className="flex flex-col h-screen items-center">
      <header>Playground</header>
      <div className="mobile bg-black my-4 rounded-xl">
        <VideoEditor
          recording={recording}
          onFinish={() => console.log("done")}
        />
      </div>
      <footer className="flex">
        <button className="btn btn-primary" onClick={() => setRecording(true)}>
          Record
        </button>
      </footer>
    </section>
  );
}
