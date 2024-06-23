import { Show, createSignal, type Component } from "solid-js";
import axios from "axios";

const App: Component = () => {
  const [selectedFile, setSelectedFile] = createSignal<File>();
  const [videoUrl, setVideoUrl] = createSignal<string>();
  const [isCreating, setIsCreating] = createSignal(false);
  const [duration, setDuration] = createSignal(3);
  const [text, setText] = createSignal("");

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setSelectedFile(input.files[0]);
    }
  };

  const handleDurationChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setDuration(Number(target.value));
  };

  const handleUpload = async () => {
    const file = selectedFile();
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.set("text", text());
    formData.set("duration", duration().toString());

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
      <Show when={!videoUrl()}>
        <div class="card w-96 bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Create Quote Video</h2>
            <input
              type="file"
              class="file-input w-full max-w-xs text-white"
              onChange={handleFileChange}
            />

            <textarea
              class="textarea textarea-primary text-white"
              placeholder="Enter Quote"
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <input
              type="range"
              min={1}
              max="10"
              value={duration()}
              class="range"
              onChange={handleDurationChange}
            />

            <div class="card-actions justify-end">
              <button class={`btn`} onClick={handleUpload}>
                <Show when={isCreating()}>
                  <span class="loading loading-spinner"></span>
                </Show>
                Create Video
              </button>
            </div>
          </div>
        </div>
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
