import { AddVideoInput } from "@via/core/video-manager";
import { useState } from "react";

type Props = {
  id: string;
  showLoader: boolean;
  onAddClick: (input: AddVideoInput) => void;
};

export const AddVideoModal = (props: Props) => {
  const [videoName, setVideoName] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box">
        <header>
          <h3 className="font-bold text-lg">Add New Video</h3>
        </header>

        <form className="py-4 px-8 my-8 flex flex-col gap-4 w-full">
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
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
