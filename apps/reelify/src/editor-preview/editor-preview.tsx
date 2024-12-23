import { MockPhone } from "./mock-phone.tsx";

export const EditorPreview = () => {
  return (
    <section
      id="editor-preview"
      className="w-full grow flex justify-center p-4 "
    >
      <div className="aspect-[9/16] h-full ">
        <MockPhone>
          <></>
        </MockPhone>
      </div>
    </section>
  );
};
