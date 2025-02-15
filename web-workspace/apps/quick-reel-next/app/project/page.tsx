import { project } from "../templates/data/project";
import { Preview } from "./preview";
import { TransitionElement } from "./transition";

export default function ProjectPage() {
  const transitions = project.transitions;
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Preview />
        {transitions.map((transition, index) => {
          return (
            <div className="absolute h-full w-full invisible" key={index}>
              <TransitionElement
                transition={transition}
                transitionIndex={index}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
