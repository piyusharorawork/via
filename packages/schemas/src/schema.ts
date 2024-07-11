import { z } from "zod";

export const addVideoInput = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  fileId: z.number().min(1),
});

export type AddVideoInput = z.infer<typeof addVideoInput>;
