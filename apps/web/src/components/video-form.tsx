import { Component, Show, createSignal } from "solid-js";
import classNames from "classnames";

export type HandleSubmitInput = {
  file: File;
  text: string;
  duration: number;
  resolution: Resolution;
  bottomMargin: number;
  fontSize: number;
  textColor: string;
  masterVolume: number;
};

type Props = {
  onSubmit: (input: HandleSubmitInput) => void;
  isCreating: boolean;
};

type Resolution = "None" | "High" | "Medium" | "Low";

export const VideoForm: Component<Props> = (props) => {
  const [selectedFile, setSelectedFile] = createSignal<File>();
  const [text, setText] = createSignal("");
  const [duration, setDuration] = createSignal(1);
  const [resolution, setResolution] = createSignal<Resolution>("Low");
  const [bottomMargin, setBottomMargin] = createSignal(16);
  const [fontSize, setFontSize] = createSignal(16);
  const [textColor, setTextColor] = createSignal("#ffffff");
  const [masterVolume, setMasterVolume] = createSignal(0.02);

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

  const getDisabled = () => {
    return text().length == 0 || !selectedFile() || resolution() == "None";
  };

  const onCreateVideo = () => {
    const file = selectedFile();

    if (!file) {
      return;
    }

    props.onSubmit({
      duration: duration(),
      file,
      resolution: resolution(),
      text: text(),
      bottomMargin: bottomMargin(),
      fontSize: fontSize(),
      textColor: textColor(),
      masterVolume: masterVolume(),
    });
  };

  const onBottomMarginChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setBottomMargin(Number(target.value));
  };

  const onFontSizeChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFontSize(Number(target.value));
  };

  const onTextColorChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setTextColor(target.value);
  };

  const onVolumeChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setMasterVolume(Number(target.value));
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
            max="9"
            value={duration()}
            class="range"
            onChange={handleDurationChange}
          />
        </div>

        <div class="flex items-center gap-2">
          <label>bottom margin : </label>
          <input
            type="number"
            class="rounded-md py-2 px-3 w-20 text-white"
            value={bottomMargin()}
            onChange={onBottomMarginChange}
          />
          <span>px</span>
        </div>

        <div class="flex items-center gap-2">
          <label>font size : </label>
          <input
            type="number"
            class="rounded-md py-2 px-3 w-20 text-white"
            value={fontSize()}
            onChange={onFontSizeChange}
          />
          <span>px</span>
        </div>

        <div class="flex items-center gap-3">
          <label for="hs-color-input" class="block text-sm font-medium mb-2">
            Text Color
          </label>
          <input
            type="color"
            class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
            id="hs-color-input"
            value={textColor()}
            title="Choose your color"
            onChange={onTextColorChange}
          ></input>
        </div>

        <div class="flex gap-2 items-center w-full">
          <span class="bg-slate-950 text-white px-4 py-2 rounded-full shrink-0">
            {`${masterVolume()} db`}
          </span>
          <input
            type="range"
            min={0}
            step={0.02}
            max="5"
            value={masterVolume()}
            class="range"
            onChange={onVolumeChange}
          />
        </div>

        <div class={classNames("dropdown dropdown-hover w-full")}>
          <div tabIndex={0} role="button" class="btn m-1 w-full">
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

        <div class="card-actions w-full">
          <button
            disabled={getDisabled()}
            class="btn w-full"
            onClick={onCreateVideo}
          >
            <Show when={props.isCreating}>
              <span class="loading loading-spinner"></span>
            </Show>
            Create Video
          </button>
        </div>
      </div>
    </div>
  );
};
