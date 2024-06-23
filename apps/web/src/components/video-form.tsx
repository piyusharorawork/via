import { Component, Show, createSignal } from "solid-js";
import axios from "axios";
import classNames from "classnames";

type Props = {
  onFinish: (videoUrl: string) => void;
};

type Resolution = "None" | "High" | "Medium" | "Low";

export const VideoForm: Component<Props> = (props) => {
  const [selectedFile, setSelectedFile] = createSignal<File>();
  const [text, setText] = createSignal("");
  const [duration, setDuration] = createSignal(3);
  const [isCreating, setIsCreating] = createSignal(false);
  const [resolution, setResolution] = createSignal<Resolution>("None");

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
    formData.set("resolution", resolution());

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

  const getDisabled = () => {
    return text().length == 0 || !selectedFile() || resolution() == "None";
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

        <div class="flex gap-2 items-center w-full">
          <span class="bg-slate-950 text-white px-4 py-2 rounded-full shrink-0">
            {`${duration()} secs`}
          </span>
          <input
            type="range"
            min={1}
            max="10"
            value={duration()}
            class="range"
            onChange={handleDurationChange}
          />
        </div>

        <div class={classNames("dropdown dropdown-hover w-full")}>
          <div tabIndex={0} role="button" class="btn m-1">
            {resolution() == "None"
              ? "Select Resolution"
              : `Resolution: ${resolution()}`}
          </div>
          <ul
            tabIndex={0}
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li onClick={() => setResolution("High")}>
              <a class="text-white">High</a>
            </li>
            <li onClick={() => setResolution("Medium")}>
              <a class="text-white">Medium</a>
            </li>
            <li onClick={() => setResolution("Low")}>
              <a class="text-white">Low</a>
            </li>
          </ul>
        </div>

        <div class="card-actions justify-end">
          <button disabled={getDisabled()} class="btn" onClick={handleUpload}>
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
