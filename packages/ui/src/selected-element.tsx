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
      <div className="w-full">
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
      </div>
    </div>
  );
};
