import { VideoEditor } from "./video-editor";
import classNames from "classnames";

type Props = {
  open: boolean;
  width: number;
  height: number;
  videoURL: string;
  text: string;
  onClose: () => void;
};

export const VideoRenderModal = (props: Props) => {
  return (
    <dialog className={classNames("modal", { "modal modal-open": props.open })}>
      <div className="modal-box">
        <h3 className="font-bold text-lg my-2">Your Video is ready</h3>

        <div className="flex justify-center">
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                <VideoEditor
                  height={props.height}
                  width={props.width}
                  videoURL={props.videoURL}
                  text={props.text}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={() => props.onClose()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
