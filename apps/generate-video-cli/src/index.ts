import { EditVideo } from "@via/editly";
import { join } from "path";

(async () => {
  const outPath = join("exports", "out.mp4");
  const assetPath = join("assets", "river.mp4");

  const finalPath = join("..", "..", "exports", "final.mp4");
  const masterVolume = 0.05;
  await EditVideo({
    outPath,
    clips: [
      {
        duration: 10,
        layers: [
          {
            type: "video",
            path: assetPath,
          },
          {
            type: "subtitle",
            bottomMargin: 300,
            text: `"There is a pleasure in the pathless woods, there is a rapture on the lonely shore, there is society where none intrudes, by the deep sea, and music in its roar; I love not Man the less, but Nature more." - Lord Byron`,
          },
        ],
      },
    ],
    width: 100,
    height: 100,
    keepSourceAudio: true,
  });
})();
