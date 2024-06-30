import { createSignal, type Component } from "solid-js";
import { HandleSubmitInput, VideoForm } from "./components/video-form";
import { VideoPreview } from "./components/video-preview";
import axios from "axios";

const App: Component = () => {
  const [videoUrl, setVideoUrl] = createSignal<string>();
  const [isCreating, setIsCreating] = createSignal(false);

  const handleSubmit = async (input: HandleSubmitInput) => {
    setVideoUrl("");
    setIsCreating(true);

    // TODO type safety
    const formData = new FormData();
    formData.append("file", input.file);
    formData.set("text", input.text);
    formData.set("duration", input.duration.toString());
    formData.set("resolution", input.resolution);
    formData.set("bottomMargin", input.bottomMargin.toString());
    formData.set("fontSize", input.fontSize.toString());
    formData.set("textColor", input.textColor.toString());

    try {
      setIsCreating(true);
      const response = await axios.post(
        "http://localhost:4000/create-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVideoUrl(response.data.url);
      setIsCreating(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div class="h-screen flex justify-center items-center">
      <div class="flex justify-center items-center gap-4 h-full">
        <VideoForm onSubmit={handleSubmit} isCreating={isCreating()} />
        <VideoPreview isCreating={isCreating()} videoUrl={videoUrl()} />
      </div>
    </div>
  );
};

export default App;
