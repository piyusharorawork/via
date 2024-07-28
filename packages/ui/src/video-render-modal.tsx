import { VideoPreview } from "./video-preview";
import classNames from "classnames";

type Props = {
  videoURL?: string;
  open: boolean;
  onClose: () => void;
};

export const VideoRenderModal = (props: Props) => {
  return (
    <dialog className={classNames("modal", { "modal modal-open": props.open })}>
      <div className="modal-box">
        <h3 className="font-bold text-lg my-2">Your Video is ready</h3>
        {props.videoURL && <VideoPreview videoURL={props.videoURL} />}
        <div className="modal-action">
          <button className="btn" onClick={() => props.onClose()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
