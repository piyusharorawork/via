import { AddVideoInput, ListVideosOutput } from "@via/core/video-manager";
import { AddVideoModal } from "@via/ui/add-video-modal";
import { NewButton } from "@via/ui/new-button";
import { SearchInput } from "@via/ui/search-input";
import { useEffect, useState } from "react";
import { trpc } from "./trpc.ts";
import { VideosTable } from "@via/ui/videos-table";
import { useActor } from "@xstate/react";
import { getVideoManagementMachine } from "@via/machine/video-management-machine";

const ADD_VIDEO_MODAL_ID = "add-video-modal";

const videoManagementMachine = getVideoManagementMachine(fetch);

export default function App() {
  const [state, send] = useActor(videoManagementMachine);

  useEffect(() => {
    send({ type: "GET_VIDEOS" });
  }, []);

  console.log(state.value);

  return (
    <div className="flex h-screen">
      <section className="h-full w-96 flex flex-col ">
        <header className="flex justify-center items-center gap-2 px-8 py-4">
          <SearchInput />
          <NewButton onClick={() => send({ type: "OPEN_ADD_VIDEO_FORM" })} />
          <AddVideoModal
            open={
              state.matches("ADD_VIDEO_FORM_OPENED") ||
              state.matches("ADDING_VIDEO")
            }
            onClose={() => send({ type: "CLOSE_ADD_VIDEO_FORM" })}
            id={ADD_VIDEO_MODAL_ID}
            showLoader={state.matches("ADDING_VIDEO")}
            onAddClick={(input) => send({ type: "ADD_VIDEO", input })}
          />
        </header>

        <main className="flex-grow ">
          {state.matches("GETTING_VIDEOS") && (
            <div className="w-full flex justify-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}

          {state.context.errorMessage != null && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Something went wrong</span>
            </div>
          )}
          {state.matches("IDLE") && (
            <VideosTable
              videos={state.context.videos}
              onVideoRowClick={() => {}}
            />
          )}
        </main>
      </section>
    </div>
  );
}
