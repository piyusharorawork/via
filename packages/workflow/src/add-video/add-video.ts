import { z } from "zod";
import { downloadYoutubeVideo } from "@via/core/download-youtube-video";
import { uploadFile } from "@via/node-sdk/upload-file";
import { createVideoStore } from "@via/store/video-store";
import { getDatabaseName, getVideoStore } from "../helpers.js";
import _ from "lodash";

export const addVideoInput = z.object({
  uuid: z.string().uuid(),
  name: z
    .string()
    .min(3)
    .refine((s) => !s.includes(" "), "No spaces allowed"),
  youtubeURL: z.string().url(),
  description: z.string().min(10),
});

export type AddVideoInput = z.infer<typeof addVideoInput>;

export const addVideo = (input: AddVideoInput) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await addVideoInput.parseAsync(input);
      const videoPath = `downloads/${input.name}.mp4`;
      await downloadYoutubeVideo(input.youtubeURL, videoPath);
      // TODO ensure upload server is stable and running
      // TODO upload file utility function must be part of workflow itself
      const fileId = await uploadFile("http://localhost:4000", videoPath);
      const videoStore = getVideoStore();
      await videoStore.insert({
        fileId,
        description: input.description,
        name: input.name,
        uuid: input.uuid,
      });

      return resolve();
    } catch (error) {
      // TODO refactor with improved types
      // TODO move this to upload file handle function
      const errorCode: string = _.get(error, "code", "");
      if (errorCode === "ECONNREFUSED") {
        return reject("file server is not running at http://localhost:4000");
      }

      return reject(error);
    }
  });
};
