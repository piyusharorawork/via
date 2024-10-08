import { AddVideoModal } from "@via/ui/add-video-modal";
import { NewButton } from "@via/ui/new-button";
import { SearchInput } from "@via/ui/search-input";
import { VideosTable } from "@via/ui/videos-table";
import { useActor } from "@xstate/react";
import { getVideoManagementMachine } from "@via/machine/video-management-machine";
import { VideoDetails } from "@via/ui/video-details";
import { executeOnce } from "../utils.ts";

const ADD_VIDEO_MODAL_ID = "add-video-modal";

const videoManagementMachine = getVideoManagementMachine(fetch);

export default function Videos() {
  const [state, send] = useActor(videoManagementMachine, {
    input: { originalVideos: [], videos: [] },
  });

  console.log(state.value);

  executeOnce(() => send({ type: "LOAD_VIDEOS_PAGE" }));

  return (
    <div className="flex h-screen">
      <section className="h-full w-96 flex flex-col ">
        <header className="flex justify-center items-center gap-2 px-8 py-4">
          <SearchInput
            onChange={(keyword) => send({ type: "SEARCH_VIDEO", keyword })}
          />
          <NewButton onClick={() => send({ type: "CLICK_NEW_VIDEO_BUTTON" })} />
          <AddVideoModal
            open={state.matches("NewVideoFormOpened")}
            onClose={() => send({ type: "CLOSE_ADD_VIDEO_FORM" })}
            id={ADD_VIDEO_MODAL_ID}
            showLoader={state.matches({ NewVideoFormOpened: "addingVideo" })}
            onAddClick={(input) => send({ type: "CLICK_ADD_VIDEO", input })}
          />
        </header>

        <main className="flex-grow ">
          {state.matches({ VideosPage: "loadingVideosPage" }) && (
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
          {/* TODO fix this hack */}
          {(state.matches("VideosPage") || state.matches("VideoSelected")) && (
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
        {state.matches({ VideosPage: "loadingVideoDetails" }) && (
          <div className="w-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}

        {state.matches("VideoSelected") &&
          state.context.videoDetails != null && (
            <VideoDetails
              videoDescription={state.context.videoDetails.descrption}
              videoName={state.context.videoDetails.name}
              videoURL={state.context.videoDetails.videoURL}
              fps={state.context.videoDetails.fps}
              frameCount={state.context.videoDetails.frameCount}
              height={state.context.videoDetails.height}
              width={state.context.videoDetails.width}
              onDelete={() => {
                send({
                  type: "CLICK_DELETE_VIDEO",
                  input: {
                    videoUUID: state.context.videoDetails!.videoUUID,
                  },
                });
              }}
            />
          )}
      </section>
    </div>
  );
}
