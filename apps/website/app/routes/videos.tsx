import type { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useQuery, useQueryClient } from "react-query";
import { Outlet, Link, useNavigate } from "@remix-run/react";

import { SearchInput } from "@via/ui/search-input";
import { NewButton } from "@via/ui/new-button";
import { VideosTable } from "@via/ui/videos-table";
import { AddVideoModal } from "@via/ui/add-video-modal";

const ADD_VIDEO_MODAL_ID = "add-video-modal";

const onNewButtonClick = () => {
  // TODO fixed any
  const addVideoModalElement: any = document.getElementById(ADD_VIDEO_MODAL_ID);
  if (!addVideoModalElement) {
    return;
  }

  addVideoModalElement.showModal();
};

export default function () {
  const listVideoQuery = useQuery("list-videos", async () => {
    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    });

    const videos = await trpc.listVideos.query({ limit: 10 });
    return videos;
  });

  const navigate = useNavigate();

  return (
    <div className="flex h-screen ">
      <section className="h-full w-96 flex flex-col ">
        <header className="flex justify-center items-center gap-2 px-8 py-4">
          <SearchInput />
          <NewButton onClick={onNewButtonClick} />
          <AddVideoModal
            id={ADD_VIDEO_MODAL_ID}
            showLoader={false}
            onAddClick={() => {}}
          />
        </header>

        <main className="flex-grow ">
          {listVideoQuery.data && (
            <VideosTable
              videos={listVideoQuery.data}
              onVideoRowClick={(videoId) => navigate(`/videos/${videoId}`)}
            />
          )}
        </main>
      </section>

      <Outlet />
    </div>
  );
}
