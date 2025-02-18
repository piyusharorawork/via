import { VideoElement } from "@via/machine/generate-reel-machine";
import { VideoEditor } from "./video-editor";
import classNames from "classnames";
import { SelectedElement } from "./selected-element";

type Props = {
  width: number;
  height: number;
  videoURL: string;
  fps: number;
  frames: number;
  quote: string;
  selectedElement: VideoElement | null;
  videoElements: VideoElement[];
  onExport: () => void;
  onClose: () => void;
  onSelectElement: (element: VideoElement) => void;
  onUnselectAll: () => void;
  onUpdateElement: (element: VideoElement) => void;
};

export const VideoEditorModal = (props: Props) => {
  return (
    <dialog className={"modal modal-open"}>
      <div className="modal-box">
        <SelectedElement
          onUpdateElement={props.onUpdateElement}
          selectedElement={props.selectedElement}
        />

        <div className="flex justify-center">
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                <VideoEditor
                  height={props.height}
                  width={props.width}
                  videoURL={props.videoURL}
                  text={props.quote}
                  fps={props.fps}
                  frames={props.frames}
                  videoElements={props.videoElements}
                  onSelectElement={props.onSelectElement}
                  onUnselectAll={props.onUnselectAll}
                  onUpdateElement={props.onUpdateElement}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={() => props.onExport()}>
            <span>Export</span>

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
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
          <button className="btn btn-error" onClick={() => props.onClose()}>
            <span>Close</span>

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
    </dialog>
  );
};
