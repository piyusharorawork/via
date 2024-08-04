import { VideoEditor } from "@via/ui/video-editor";
import { useState } from "react";

export default function Playground() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  return (
    <section className="flex flex-col h-screen items-center">
      <header>Playground</header>
      <div className="bg-black my-4 rounded-xl">
        <VideoEditor
          recording={recording}
          onFinish={(url) => {
            setVideoURL(url);
          }}
        />
      </div>
      <footer className="flex">
        <button className="btn btn-primary" onClick={() => setRecording(true)}>
          Record
        </button>
      </footer>

      {videoURL && (
        <video controls>
          <source src={videoURL}></source>
        </video>
      )}
    </section>
  );
}
