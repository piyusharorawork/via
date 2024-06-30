import { MakeVideoInput, makeVideo } from "@via/video-maker/make-video";
import { join } from "path";

(async () => {
  try {
    const input: MakeVideoInput = {
      duration: 10,
      height: 1920,
      outPath: join("exports", "out.mp4"),
      text: `"There is a pleasure in the pathless woods, there is a rapture on the lonely shore, there is society where none intrudes, by the deep sea, and music in its roar; I love not Man the less, but Nature more." - Lord Byron`,
      videoAssetPath: join("assets", "river.mp4"),
      width: 1080,
      masterVolume: 0.05,
      bottomMargin: 0,
      fontSize: 16,
    };

    await makeVideo(input);
  } catch (error) {
    console.error(error);
  }
})();
