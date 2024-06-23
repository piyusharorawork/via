import { Component, Show, createSignal } from "solid-js";
import axios from "axios";

type Props = {
  onFinish: (videoUrl: string) => void;
};

export const VideoForm: Component<Props> = (props) => {
  const [selectedFile, setSelectedFile] = createSignal<File>();
  const [text, setText] = createSignal("");
  const [duration, setDuration] = createSignal(3);
  const [isCreating, setIsCreating] = createSignal(false);

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

      props.onFinish(response.data.url);
      setIsCreating(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
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
  );
};
