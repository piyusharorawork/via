import { EditVideo } from "@via/editly";

(async () => {
  console.log(`executing edit video ...`);

  const videoPath = process.argv[2];
  const text = process.argv[3];
  const generateVideoPath = process.argv[4];

  if (!videoPath || !text || !generateVideoPath) {
    throw "not all required inputs passed";
  }

  console.log({ videoPath, text, generateVideoPath });

  await EditVideo({
    outPath: generateVideoPath,
    clips: [
      {
        layers: [
          {
            type: "video",
            path: videoPath,
          },
          {
            type: "subtitle",
            bottomMargin: 4,
            text: text,
            fontSize: 12,
            textColor: "#fff",
          },
        ],
      },
    ],
    width: 540,
    height: 960,
    keepSourceAudio: true,
  });
})();
