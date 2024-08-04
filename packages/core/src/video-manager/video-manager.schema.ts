import { z } from "zod";

export const addVideoInput = z.object({
  name: z
    .string()
    .min(3)
    .refine((s) => !s.includes(" "), "No spaces allowed"),
  youtubeURL: z.string().url(),
  description: z.string().min(10),
});

export type AddVideoInput = z.infer<typeof addVideoInput>;

export type AddVideoOutput = {
  videoUUID: string;
};

export const listVideosInput = z.object({
  limit: z.number().min(1).max(10),
});

export type ListVideosInput = z.infer<typeof listVideosInput>;
export type ListVideoItem = {
  uuid: string;
  name: string;
  description: string;
  id: number;
};
export type ListVideosOutput = ListVideoItem[];

export const removeVideoInput = z.object({
  videoUUID: z.string().uuid(),
});

export type RemoveVideoInput = z.infer<typeof removeVideoInput>;
export type RemoveVideoOutput = {
  success: boolean;
};

export const viewVideoInput = z.object({
  videoUUID: z.string().uuid(),
});

export type ViewVideoInput = z.infer<typeof viewVideoInput>;
export type ViewVideoOutput = {
  videoUUID: string;
  name: string;
  originalURL: string;
  descrption: string;
  createdAt: string;
  videoURL: string;
  fps: string;
  frameCount: number;
  width: number;
  height: number;
};

export const makeVideoInput = z.object({
  prompt: z.string(),
  quote: z.string(),
});

export type MakeVideoInput = z.infer<typeof makeVideoInput>;

export type MakeVideoOutput = {
  videoURL: string;
};

export const generateReelInput = z.object({
  prompt: z.string(),
  quote: z.string(),
});

export type GenerateReelInput = z.infer<typeof generateReelInput>;

export type GenerateReelOutput = {
  videoId: number;
  videoUUID: string;
  videoURL: string;
  width: number;
  height: number;
  fps: string;
  frames: number;
};
