import { Router, Express } from "express";
import { useMulter } from "../multer.js";
import { createFileStore, File } from "@via/store/file-store";

export const getUploadVideoRouter = (app: Express) => {
  const router = Router();
  const upload = useMulter(app);
  router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.json("no files");
    }

    const fileStore = createFileStore("via.db");
    await fileStore.insert({
      originalName: req.file.originalname,
      destination: req.file.destination,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      path: req.file.path,
    });

    // TODO need to use network hostname
    const fileURL = `http://localhost:4000/${req.file.filename}`;

    return res.json(fileURL);
  });
  return router;
};
