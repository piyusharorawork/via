import express from "express";
import cors from "cors";
import { useMulter } from "./multer.js";
import { createVideo } from "./create-video.js";

(async () => {
  try {
    const app = express();
    app.use(cors());
    const upload = useMulter(app);
    const PORT = process.env.PORT || 4000;

    app.post("/create-video", upload.single("file"), async (req, res) => {
      // TODO need type safey req body
      if (req.file) {
        const url = await createVideo({
          duration: Number(req.body.duration),
          file: req.file,
          resolution: req.body.resolution,
          text: req.body.text,
          bottomMargin: Number(req.body.bottomMargin),
          fontSize: Number(req.body.fontSize),
          textColor: req.body.textColor,
          masterVolume: Number(req.body.masterVolume),
        });
        res.json({
          success: true,
          message: "File uploaded successfully",
          file: req.file,
          url,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
