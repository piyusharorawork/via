import { TextInfo, VideoElement } from "@via/machine/generate-reel-machine";

type Props = {
  selectedElement: VideoElement | null;
  onUpdateElement: (element: VideoElement) => void;
};

export const SelectedElement = (props: Props) => {
  if (props.selectedElement === null || props.selectedElement.type !== "text") {
    return <div className="h-16 mb-4 flex  "></div>;
  }

  const handleUpdateElement = (textInfo: Partial<TextInfo>) => {
    if (props.selectedElement === null) return;

    const updatedElement: VideoElement = {
      ...props.selectedElement,
      textInfo: {
        ...props.selectedElement.textInfo,
        ...textInfo,
      },
    };

    props.onUpdateElement(updatedElement);
  };

  return (
    <div className=" h-16 mb-4 w-full flex items-center justify-center rounded-md gap-2">
      <label className="form-control relative">
        <label className="absolute -top-6 left-2">Text</label>
        <input
          type="text"
          className="input input-bordered w-32"
          value={props.selectedElement.textInfo.text}
          onChange={(e) => handleUpdateElement({ text: e.target.value })}
        />
      </label>

      <label className="form-control relative">
        <label className="absolute -top-6 left-2">Color</label>
        <input
          type="color"
          className="input input-bordered w-16  rounded-full border-none p-0 bg-base-100"
          value={props.selectedElement.textInfo.color}
          onChange={(e) => handleUpdateElement({ color: e.target.value })}
        />
      </label>

      <label className="form-control relative">
        <label className="absolute -top-6 left-2">Font</label>
        <input
          type="number"
          className="input input-bordered w-16"
          value={props.selectedElement.textInfo.fontSize}
          onChange={(e) => {
            if (!e.target.valueAsNumber) return;
            handleUpdateElement({ fontSize: e.target.valueAsNumber });
          }}
        />
      </label>
    </div>
  );
};
