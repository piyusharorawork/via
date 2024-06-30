import { Component, Show } from "solid-js";

type Props = {
  videoUrl?: string;
  isCreating: boolean;
};

export const VideoPreview: Component<Props> = (props) => {
  return (
    <div class="w-96 h-full flex items-center justify-center">
      <div class="mobile bg-black rounded-xl">
        <Show when={props.isCreating}>
          <div class="h-full w-full flex justify-center items-center">
            <span class="loading loading-dots loading-lg"></span>
          </div>
        </Show>
        <Show when={!!props.videoUrl}>
          <video class="h-full w-full rounded-xl" controls loop>
            <source src={props.videoUrl} type="video/mp4" />
          </video>
        </Show>
      </div>
    </div>
  );
};
