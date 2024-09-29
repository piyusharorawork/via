import { VideoPreview } from "./video-preview";
import { VideoStats } from "./video-stats";

type Props = {
  videoURL: string;
  videoName: string;
  videoDescription: string;
  width: number;
  height: number;
  fps: string;
  frameCount: number;
  onDelete: () => void;
};

export const VideoDetails = (props: Props) => {
  return (
    <div className="w-full">
      <div className="card card-compact w-full shadow-xl py-4 px-8">
        <VideoPreview videoURL={props.videoURL} />
        <div className="card-body">
          <h2 className="card-title">{props.videoName}</h2>
          <div className="chat chat-start">
            <div className="chat-bubble">{props.videoDescription}</div>
          </div>

          <VideoStats
            width={props.width}
            height={props.height}
            frames={props.frameCount}
            fps={props.fps}
          />

          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={() => props.onDelete()}>
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
