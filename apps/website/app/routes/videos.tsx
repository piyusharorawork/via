import type { AppRouter } from "@via/server/app-router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useQuery, useQueryClient } from "react-query";

export default function () {
  const onAddVideo = async () => {
    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    });
  };

  const queryClient = useQueryClient();

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

  return (
    <div>
      <button className="btn" onClick={onAddVideo}>
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
      </button>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
                <tr key={video.uuid}>
                  <th>1</th>
                  <td>{video.name}</td>
                  <td>{video.url}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
