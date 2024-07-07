import { Router, Express } from "express";
import { useMulter } from "../multer.js";
import { createFileStore } from "@via/store/file-store";

export const getUploadFileRouter = (app: Express) => {
  const router = Router();
  const upload = useMulter(app);
  router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.json("no files");
    }

    const fileStore = createFileStore("via.db");
    const fileId = await fileStore.insert({
      originalName: req.file.originalname,
      destination: req.file.destination,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      path: req.file.path,
    });

    return res.json(fileId);
  });
  return router;
};
