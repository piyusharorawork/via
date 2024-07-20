import type { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useQuery, useQueryClient } from "react-query";
import { Outlet, Link, useNavigate } from "@remix-run/react";

import { Card } from "@via/ui/card";
import { SearchInput } from "@via/ui/search-input";
import { NewButton } from "@via/ui/new-button";

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
          <NewButton />
        </header>

        <main className="flex-grow ">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Desciption</th>
                </tr>
              </thead>
              <tbody>
                {listVideoQuery.data?.map((video, index) => {
                  return (
                    <tr
                      key={video.uuid}
                      className="cursor-pointer"
                      onClick={() => navigate(`/videos/${video.uuid}`)}
                    >
                      <th>{index + 1}</th>
                      <td>{video.name}</td>
                      <td>{video.description}</td>
                    </tr>
                  );
                })}
                {/* row 1 */}
              </tbody>
            </table>
          </div>
        </main>
      </section>
      {/* <section className="h-full flex-grow"></section> */}

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
