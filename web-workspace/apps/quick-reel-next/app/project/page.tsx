import { MediaElements } from "./media-elements";
import { Preview } from "./preview";

export default function ProjectPage() {
  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <section
          className="h-full relative "
          style={{ width: "calc(100vh * 0.5625)" }}
        >
          <MediaElements />
          <Preview />
        </section>
      </div>
    </>
  );
}
