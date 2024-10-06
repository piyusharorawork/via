import { VideoElement } from "@via/machine/generate-reel-machine";

type Props = {
  selectedElement: VideoElement | null;
  onUpdateElement: (element: VideoElement) => void;
};

export const SelectedElement = (props: Props) => {
  if (props.selectedElement === null || props.selectedElement.type !== "text") {
    return <div className="h-16 flex"></div>;
  }

  return (
    <div className="h-16 flex">
      <div className="w-full flex  gap-2 items-center py-3 ">
        <input
          type="text"
          className="input input-bordered max-w-xs input-md"
          value={props.selectedElement.textInfo.text}
          onChange={(e) => {
            if (!props.selectedElement) return;
            const updatedText = e.target.value;
            props.onUpdateElement({
              ...props.selectedElement,
              textInfo: {
                ...props.selectedElement.textInfo,
                text: updatedText,
              },
            });
          }}
        />

        {/* hide input boundry  */}
        <input
          type="color"
          className="w-12 h-12 rounded-full border-none p-0 bg-base-100"
          value={props.selectedElement.textInfo.color}
          onChange={(e) => {
            if (!props.selectedElement) return;
            const updatedColor = e.target.value;
            props.onUpdateElement({
              ...props.selectedElement,
              textInfo: {
                ...props.selectedElement.textInfo,
                color: updatedColor,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
