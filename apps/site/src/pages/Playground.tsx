import { VideoEditor } from "@via/ui/video-editor";
import { useRef, useState } from "react";

export default function Playground() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  // const [photoURL, setPhotoURL] = useState<string | null>(null);

  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // const onPhoto = () => {
  //   const canvas = canvasRef.current as unknown as HTMLCanvasElement;
  //   const img = canvas.toDataURL("image/png");

  //   canvas.toBlob((data) => {
  //     debugger;
  //     console.log(data);
  //   });

  //   setPhotoURL(img);
  // };

  return (
    <section className="flex flex-col h-screen items-center">
      <header>Playground</header>
      <div className="bg-black my-4 rounded-xl">
        <VideoEditor
          // canvasRef={canvasRef}
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
        {/* <button className="btn" onClick={() => onPhoto()}>
          Take Photo
        </button> */}
      </footer>

      {videoURL && (
        <video controls>
          <source src={videoURL}></source>
        </video>
      )}

      {/* {photoURL && <img width={180} height={320} src={photoURL} />} */}
    </section>
  );
}
