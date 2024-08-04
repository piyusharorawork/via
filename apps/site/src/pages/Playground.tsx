import { VideoRenderer } from "@via/ui/video-renderer";
import { useState } from "react";

// Need to fetch it from backend
const WIDTH = 270;
const HEIGHT = 480;
const FPS = 60;
const FRAMES = 300;

export default function Playground() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  return (
    <section className="flex flex-col h-screen items-center">
      <header>Playground</header>
      <div className="bg-black my-4 rounded-xl">
        <VideoRenderer
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          frames={FRAMES}
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
        <video width={WIDTH} height={HEIGHT} controls>
          <source src={videoURL}></source>
        </video>
      )}
    </section>
  );
}
