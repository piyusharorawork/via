import { AddVideoInput } from "@via/core/video-manager";
import { useState } from "react";
import classNames from "classnames";

type Props = {
  id: string;
  showLoader: boolean;
  open: boolean;
  onAddClick: (input: AddVideoInput) => void;
  onClose: () => void;
};

export const AddVideoModal = (props: Props) => {
  const [videoName, setVideoName] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  return (
    <dialog
      id={props.id}
      className={classNames("modal", { "modal-open": props.open })}
    >
      <div className="modal-box">
        <header className="flex justify-between">
          <h3 className="font-bold text-lg">Add New Video</h3>
          <button
            className="btn btn-circle btn-outline"
            onClick={() => props.onClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <div className="py-4 px-8 my-8 flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Video Name"
            className="input input-bordered w-full"
            onChange={(e) => setVideoName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Youtube url (e.g https://www.youtube.com...)"
            className="input input-bordered w-full"
            onChange={(e) => setYoutubeURL(e.target.value)}
          />

          <textarea
            className="textarea textarea-bordered"
            placeholder="Video Description"
            onChange={(e) => setVideoDescription(e.target.value)}
          ></textarea>

          <button
            className="btn btn-active btn-primary text-gray-200"
            onClick={() =>
              props.onAddClick({
                description: videoDescription,
                name: videoName,
                youtubeURL,
              })
            }
          >
            <span>Add</span>
            {props.showLoader && (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
