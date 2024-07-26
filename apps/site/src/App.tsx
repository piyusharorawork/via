import { AddVideoInput, ListVideosOutput } from "@via/core/video-manager";
import { AddVideoModal } from "@via/ui/add-video-modal";
import { NewButton } from "@via/ui/new-button";
import { SearchInput } from "@via/ui/search-input";
import { useEffect, useState } from "react";
import { trpc } from "./trpc.ts";
import { VideosTable } from "@via/ui/videos-table";
import { useActor } from "@xstate/react";
import { getVideoManagementMachine } from "@via/machine/video-management-machine";
import { VideoPreview } from "@via/ui/video-preview";

const ADD_VIDEO_MODAL_ID = "add-video-modal";

const videoManagementMachine = getVideoManagementMachine(fetch);

export default function App() {
  const [state, send] = useActor(videoManagementMachine);

  useEffect(() => {
    send({ type: "LOAD_VIDEOS_PAGE" });
  }, []);

  return (
    <div className="flex h-screen">
      <section className="h-full w-96 flex flex-col ">
        <header className="flex justify-center items-center gap-2 px-8 py-4">
          <SearchInput
            onChange={(keyword) => send({ type: "SEARCH_VIDEO", keyword })}
          />
          <NewButton onClick={() => send({ type: "CLICK_NEW_VIDEO_BUTTON" })} />
          <AddVideoModal
            open={
              state.matches("ADD_VIDEO_FORM_OPENED") ||
              state.matches("ADDING_VIDEO")
            }
            onClose={() => send({ type: "CLOSE_ADD_VIDEO_FORM" })}
            id={ADD_VIDEO_MODAL_ID}
            showLoader={state.matches("ADDING_VIDEO")}
            onAddClick={(input) => send({ type: "CLICK_ADD_VIDEO", input })}
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
              onVideoRowClick={(videoId) => {
                send({
                  type: "CLICK_VIDEO_ROW",
                  input: { videoUUID: videoId },
                });
              }}
            />
          )}
        </main>
      </section>

      <section className="flex-grow">
        {state.matches("LOADING_VIDEO_DETAILS") && (
          <div className="w-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}

        {state.matches("IDLE") && state.context.videoDetails != null && (
          <div className="w-full">
            <div className="card card-compact w-full shadow-xl py-4 px-8">
              <VideoPreview videoURL={state.context.videoDetails.videoURL} />
              <div className="card-body">
                <h2 className="card-title">
                  {state.context.videoDetails.name}
                </h2>
                <p>{state.context.videoDetails.descrption}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-error"
                    onClick={() =>
                      send({
                        type: "CLICK_DELETE_VIDEO",
                        input: {
                          videoUUID: state.context.videoDetails!.videoUUID,
                        },
                      })
                    }
                  >
                    Delete
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
