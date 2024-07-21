type Props = {
  id: string;
  showLoader: boolean;
  onAddClick: () => void;
};

export const AddVideoModal = (props: Props) => {
  return (
    <dialog id={props.id} className="modal modal-open">
      <div className="modal-box">
        <header>
          <h3 className="font-bold text-lg">Add New Video</h3>
        </header>

        <form className="py-4 px-8 my-8 flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Video Name"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Youtube url (e.g https://www.youtube.com...)"
            className="input input-bordered w-full"
          />

          <textarea
            className="textarea textarea-bordered"
            placeholder="Video Description"
          ></textarea>

          <button
            className="btn btn-active btn-primary text-gray-200"
            onClick={() => props.onAddClick()}
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
