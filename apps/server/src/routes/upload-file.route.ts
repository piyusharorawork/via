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

    // TODO Create file store in context
    // TODO migrate this part to core itself to ensure all store operations happeded in workflow
    // const fileStore = createFileStore(process.env.DATABASE_NAME!);
    // const fileId = await fileStore.insert({
    //   originalName: req.file.originalname,
    //   destination: req.file.destination,
    //   fileName: req.file.filename,
    //   mimeType: req.file.mimetype,
    //   path: req.file.path,
    // });

    return res.json(req.file);
  });
  return router;
};
