import type { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useQuery, useQueryClient } from "react-query";
import { Outlet, Link } from "@remix-run/react";
import { NewButton } from "@via/components/new-button";
import { Card } from "@via/ui/card";
import {SearchInput} from "@via/ui/search-input"

export default function () {
  // const onAddVideo = async () => {
  //   const trpc = createTRPCProxyClient<AppRouter>({
  //     links: [
  //       httpBatchLink({
  //         url: "http://localhost:4000/trpc",
  //       }),
  //     ],
  //   });
  // };

  // const queryClient = useQueryClient();

  // const listVideoQuery = useQuery("list-videos", async () => {
  //   const trpc = createTRPCProxyClient<AppRouter>({
  //     links: [
  //       httpBatchLink({
  //         url: "http://localhost:4000/trpc",
  //       }),
  //     ],
  //   });

  //   const videos = await trpc.listVideos.query({ limit: 10 });
  //   return videos;
  // });

  return (
    <div className="flex h-screen bg-red-900">
      <section className="h-full w-96 bg-green-950 px-8 py-4">
        <header className="flex gap-2">
          <SearchInput />
        {/* <SearchInput /> */}

          {/* 

          <NewButton /> */}
        </header>
      </section>
      <section className="h-full flex-grow bg-orange-400"></section>

      {/* <button className="btn" onClick={onAddVideo}>
        Add Video
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button> */}

      {/* <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Video URL</th>
            </tr>
          </thead>
          <tbody>
            {listVideoQuery.data?.map((video) => {
              return (
                <Link to={`/videos/${video.uuid}`}>
                  <tr key={video.uuid}>
                    <th>1</th>
                    <td>{video.name}</td>
                    <td>{video.url}</td>
                  </tr>
                </Link>
              );
            })}
          </tbody>
        </table>
      </div> */}

      <Outlet />
    </div>
  );
}
