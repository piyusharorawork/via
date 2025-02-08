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
  progress: number;
  onCancel: () => void;
};

export const ExportVideoModal = (props: Props) => {
  return (
    <dialog className={classNames("modal modal-open")}>
      <div className="modal-box overflow-hidden">
        <h3 className="font-bold text-lg">Exporting Video</h3>
        {
          <progress
            className="progress w-full"
            value={props.progress}
            max="100"
          ></progress>
        }

        <div className="flex justify-end gap-2">
          <div className="modal-action">
            <a className={classNames("btn btn-primary btn-disabled")}>
              <span className="loading loading-bars loading-md"></span>
              <span className="text text-white">Exporting</span>
            </a>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => {
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
