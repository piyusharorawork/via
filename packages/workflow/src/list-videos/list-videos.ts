import { z } from "zod";
import { getFileStore, getVideoStore } from "../helpers.js";

export const listVideosInput = z.object({
  limit: z.number().min(1).max(10),
});

export type ListVideosInput = z.infer<typeof listVideosInput>;
export type ListVideoItem = { uuid: string; name: string; url: string };
export type ListVideosOutput = ListVideoItem[];

export const listVideos = (input: ListVideosInput) => {
  return new Promise<ListVideosOutput>(async (resolve, reject) => {
    try {
      const videoStore = getVideoStore();
      const fileStore = getFileStore();
      const videos = await videoStore.list(input.limit);

      const videoURLMap: Record<string, string> = {};
      for (const video of videos) {
        // TODO can be optimized more
        const file = await fileStore.get(video.fileId);
        const videoURL = `http://localhost:4000/${file.path}`;
        videoURLMap[video.id] = videoURL;
      }

      const videosOutput: ListVideosOutput = videos.map((video) => {
        const url = videoURLMap[video.id];
        if (!url) {
          throw `no video url found for video id = ${video.id}`;
        }
        const item: ListVideoItem = {
          name: video.name,
          url,
          uuid: video.uuid,
        };

        return item;
      });

      return resolve(videosOutput);
    } catch (error) {
      reject(error);
    }
  });
};
