import { AddVideoInput, ListVideosOutput } from "@via/core/video-manager";
import { AddVideoModal } from "@via/ui/add-video-modal";
import { NewButton } from "@via/ui/new-button";
import { SearchInput } from "@via/ui/search-input";
import { useEffect, useState } from "react";
import { trpc } from "./trpc.ts";
import { VideosTable } from "@via/ui/videos-table";
import { useActor } from "@xstate/react";
import { getVideoManagmentMachine } from "@via/machine/videos-management-machine";

const ADD_VIDEO_MODAL_ID = "add-video-modal";

const videoManagementMachine = getVideoManagmentMachine(fetch);

export default function App() {
  // const [showLoaderAddVideo, setShowLoaderAddVideo] = useState(false);
  // const [videos, setVideos] = useState<ListVideosOutput>([]);

  const [state, send] = useActor(videoManagementMachine);

  // const onNewButtonClick = () => {
  //   // TODO fixed any
  //   const addVideoModalElement: any =
  //     document.getElementById(ADD_VIDEO_MODAL_ID);
  //   if (!addVideoModalElement) {
  //     return;
  //   }

  //   addVideoModalElement.showModal();
  // };

  // const fetchVideos = async () => {
  //   const videos = await trpc.listVideos.query({ limit: 10 });
  //   setVideos(videos);
  // };

  useEffect(() => {
    send({ type: "INIT" });
  }, []);

  // const onAddVideoModalClick = async (input: AddVideoInput) => {
  //   try {
  //     setShowLoaderAddVideo(true);
  //     await trpc.addVideo.mutate(input);
  //     await fetchVideos();
  //     setShowLoaderAddVideo(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex h-screen ">
      <section className="h-full w-96 flex flex-col ">
        <header className="flex justify-center items-center gap-2 px-8 py-4">
          <SearchInput />
          {/* <NewButton onClick={onNewButtonClick} />
          <AddVideoModal
            id={ADD_VIDEO_MODAL_ID}
            showLoader={showLoaderAddVideo}
            onAddClick={onAddVideoModalClick}
          /> */}
        </header>

        <main className="flex-grow ">
          {state.matches("FETCHING_LIST_VIDEOS") && (
            <div className="w-full flex justify-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}

          {state.matches("FETCHING_LIST_VIDEOS_FAILED") && (
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
              <span>Fetching Videos Failed , Please try again in sometime</span>
            </div>
          )}

          {state.matches("FETCHING_LIST_VIDEOS_SUCCESSFUL") && (
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
