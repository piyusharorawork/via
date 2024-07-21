import { useParams, useNavigate } from "@remix-run/react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { ViewVideoOutput } from "@via/core/video-manager";
import { AppRouter } from "@via/server/app-router";
import { useEffect, useState } from "react";
import { trpc } from "../trpc";

export default function VideoDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [viewVideoLoading, setViewVideoLoading] = useState(false);
  const [video, setVideo] = useState<ViewVideoOutput>();
  const videoId = params.videoId!;

  const fetchVideo = async () => {
    setViewVideoLoading(true);
    const video = await trpc.viewVideo.query({ videoUUID: videoId });
    setVideo(video);
    setViewVideoLoading(false);
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const onRemoveVideoClick = async () => {
    await trpc.removeVideo.mutate({ videoUUID: videoId });
    navigate("/videos");
  };

  if (viewVideoLoading || !video) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="card card-compact bg-base-100 w-full shadow-xl py-4 px-8">
        <figure>
          <video className="rounded-xl" controls loop>
            <source src={video.videoURL} type="video/mp4" />
          </video>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{video.name}</h2>
          <p>{video.descrption}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={onRemoveVideoClick}>
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
  );
}
