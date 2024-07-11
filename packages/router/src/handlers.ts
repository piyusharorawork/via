import { createVideoStore } from "@via/store/video-store";
import { CreateVideoInput } from "./inputs.js";
import { AddVideoInput } from "@via/schemas/schema";

export const createVideo = (input: CreateVideoInput) => {};

export const addVideo = async (input: AddVideoInput) => {
  // TODO Fix the db
  const videoStore = createVideoStore("router.db");
  await videoStore.insert({
    name: input.name,
    fileId: input.fileId,
    description: input.description,
  });
};
