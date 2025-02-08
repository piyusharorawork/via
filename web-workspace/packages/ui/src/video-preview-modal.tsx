import classNames from "classnames";
import { VideoPreview } from "./video-preview";

type Props = {
  exportedVideoURL: string;
  onClose: () => void;
};

export const VideoPreviewModal = (props: Props) => {
  const onDownload = () => {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    // Set the href to the Blob URL
    a.href = props.exportedVideoURL;
    a.download = "video.mp4"; // Set the desired file name for download

    // Programmatically trigger a click on the <a> element to start download
    a.click();

    // Clean up: Remove the <a> element and revoke the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(props.exportedVideoURL);
  };

  return (
    <dialog className={classNames("modal modal-open")}>
      <div className="modal-box">
        <h3 className="font-bold text-lg my-2">Video PReview</h3>

        <div>
          <VideoPreview videoURL={props.exportedVideoURL} />
          <div className="mt-3 flex justify-between gap-2">
            <button className="btn btn-primary" onClick={() => onDownload()}>
              Download
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
            </button>

            <button
              className="btn btn-neutral "
              onClick={() => props.onClose()}
            >
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
      </div>
    </dialog>
  );
};
