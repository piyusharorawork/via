import { Show, createSignal, type Component } from "solid-js";
import { VideoForm } from "./components/video-form";

const App: Component = () => {
  const [videoUrl, setVideoUrl] = createSignal<string>();

  return (
    <div class="h-screen flex justify-center items-center">
      <Show when={!videoUrl()}>
        <VideoForm onFinish={setVideoUrl} />
      </Show>

      <Show when={!!videoUrl()}>
        <video class="h-full w-full rounded-lg" controls>
          <source src={videoUrl()} type="video/mp4" />
        </video>
      </Show>
    </div>
  );
};

export default App;
