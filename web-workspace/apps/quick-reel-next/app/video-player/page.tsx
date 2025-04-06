import { Player } from "./player";
import { VideoForm } from "./video-form";

export default function VideoPlayerPage() {
  return (
    <div className="flex flex-col h-screen">
      <section className="grow ">
        <Player />
      </section>
      <section className="h-36 ">
        <VideoForm />
      </section>
    </div>
  );
}
