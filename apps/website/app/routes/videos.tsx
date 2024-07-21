import type { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { Outlet, Link, useNavigate } from "@remix-run/react";

import { SearchInput } from "@via/ui/search-input";
import { NewButton } from "@via/ui/new-button";
import { VideosTable } from "@via/ui/videos-table";
import { AddVideoModal } from "@via/ui/add-video-modal";
import { AddVideoInput, ListVideosOutput } from "@via/core/video-manager";
import { useEffect, useState } from "react";
import { trpc } from "../trpc";
const ADD_VIDEO_MODAL_ID = "add-video-modal";

export default function () {
  const navigate = useNavigate();

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
    setShowLoaderAddVideo(true);
    await trpc.addVideo.mutate(input);
    await fetchVideos();
    setShowLoaderAddVideo(false);
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
          <VideosTable
            videos={videos}
            onVideoRowClick={(videoId) => navigate(`/videos/${videoId}`)}
          />
        </main>
      </section>

      <Outlet />
    </div>
  );
}
