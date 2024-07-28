import { EditVideo } from "@via/editly";

(async () => {
  console.log(`executing edit video ...`);

  const videoPath = process.argv[2];
  const text = process.argv[3];
  const generateVideoPath = process.argv[4];

  if (!videoPath || !text || !generateVideoPath) {
    throw "not all required inputs passed";
  }

  const quote = decodeURI(text);

  const width = 540;
  const height = 960;

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
            bottomMargin: height / 2,
            text: quote,
            fontSize: 48,
            textColor: "#fff",
          },
        ],
      },
    ],
    width,
    height,
    keepSourceAudio: true,
  });
})();
