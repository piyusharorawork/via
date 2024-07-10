import { z } from "zod";

export const createVideoInput = z.object({
  duration: z.number(),
  resolution: z.enum(["High", "Medium", "Low"]),
  bottomMargin: z.number(),
  fontSize: z.number(),
  textColor: z.string().startsWith("#"),
  masterVolume: z.number(),
});

export type CreateVideoInput = z.infer<typeof createVideoInput>;
