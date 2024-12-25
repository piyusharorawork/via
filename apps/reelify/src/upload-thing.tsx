import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@via/server/upload-thing";
export const MyUploadButton = generateUploadButton<OurFileRouter>({
  url: "http://localhost:4000/api/uploadthing",
}) as any;
