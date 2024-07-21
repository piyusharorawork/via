import { AddVideoInput, ListVideosOutput } from "@via/core/video-manager";
import { AddVideoModal } from "@via/ui/add-video-modal";
import { NewButton } from "@via/ui/new-button";
import { SearchInput } from "@via/ui/search-input";
import { useEffect, useState } from "react";
import { trpc } from "./trpc.ts";
import { VideosTable } from "@via/ui/videos-table";

const ADD_VIDEO_MODAL_ID = "add-video-modal";

export default function App() {
  const [showLoaderAddVideo, setShowLoaderAddVideo] = useState(false);
  const [videos, setVideos] = useState<ListVideosOutput>([]);

  const onNewButtonClick = () => {
    // TODO fixed any
    const addVideoModalElement: any =
      document.getElementById(ADD_VIDEO_MODAL_ID);
    if (!addVideoModalElement) {
      return;
    }

    addVideoModalElement.showModal();
  };

  const fetchVideos = async () => {
    const videos = await trpc.listVideos.query({ limit: 10 });
    setVideos(videos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onAddVideoModalClick = async (input: AddVideoInput) => {
    try {
      setShowLoaderAddVideo(true);
      await trpc.addVideo.mutate(input);
      await fetchVideos();
      setShowLoaderAddVideo(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen ">
      <section className="h-full w-96 flex flex-col ">
        <header className="flex justify-center items-center gap-2 px-8 py-4">
          <SearchInput />
          <NewButton onClick={onNewButtonClick} />
          <AddVideoModal
            id={ADD_VIDEO_MODAL_ID}
            showLoader={showLoaderAddVideo}
            onAddClick={onAddVideoModalClick}
          />
        </header>

        <main className="flex-grow ">
          <VideosTable videos={videos} onVideoRowClick={() => {}} />
        </main>
      </section>
    </div>
  );
}
