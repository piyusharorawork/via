import { Router, Express } from "express";
import { useMulter } from "../multer.js";

export const getUploadFileRouter = (app: Express) => {
  const router = Router();
  const upload = useMulter(app);
  router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.json("no files");
    }

    return res.json(req.file);
  });
  return router;
};
