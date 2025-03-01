import { project } from "../templates/data/project";
import { MediaElements } from "./media-elements";
import { Preview } from "./preview";
import { TransitionElement } from "./transition";

export default function ProjectPage() {
  const transitions = project.transitions;
  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <section
          className="h-full relative "
          style={{ width: "calc(100vh * 0.5625)" }}
        >
          <MediaElements transitions={transitions} />
          <Preview />
        </section>
      </div>
    </>
  );
}
