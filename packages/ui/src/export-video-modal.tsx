import { useEffect, useState } from "react";
import { VideoRenderer } from "./video-renderer";
import classNames from "classnames";

type Props = {
  width: number;
  height: number;
  fps: number;
  frames: number;
  videoURL: string;
  quote: string;
  onCancel: () => void;
};

export const ExportVideoModal = (props: Props) => {
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setURL] = useState("");

  // TODO Get rid of this
  useEffect(() => {
    // TODO here we can select the resolutions later before recording
    setRecording(true);
  }, [progress]);

  return (
    <dialog className={classNames("modal modal-open")}>
      <div className="modal-box overflow-hidden">
        <h3 className="font-bold text-lg">Exporting Video</h3>
        {recording && (
          <progress
            className="progress w-full"
            value={progress}
            max="100"
          ></progress>
        )}

        <div>
          <VideoRenderer
            width={props.width}
            height={props.height}
            fps={props.fps}
            frames={props.frames}
            recording={recording}
            videoURL={props.videoURL}
            quote={props.quote}
            onProgress={(amount) => {
              setProgress(amount);
            }}
            onFinish={(url) => {
              setRecording(false);
              setURL(url);
            }}
          />
        </div>
        <div className="flex justify-end gap-2">
          <div className="modal-action">
            <a
              href={url}
              target="_blank"
              className={classNames("btn btn-primary", {
                "btn-disabled": recording,
              })}
            >
              {recording && (
                <span className="loading loading-bars loading-md"></span>
              )}

              {!recording && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              )}
              <span>{recording ? "Exporting" : "Download"}</span>
            </a>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => {
                setRecording(false);
                props.onCancel();
              }}
            >
              <span>Cancel</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
