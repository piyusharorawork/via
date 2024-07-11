import { downloadYoutubeVideo } from "./download-video";

const scenerios = [
  {
    name: "valid youtube video",
    url: "https://www.youtube.com/watch?v=tPEE9ZwTmy0",
    dirPath: "downloads",
    start: "00:00:00",
    end: "00:00:02",
    fileName: "cat-shocked.mp4",
  },
];

for (const scenerio of scenerios) {
  test(scenerio.name, async () => {
    await downloadYoutubeVideo({
      dirPath: scenerio.dirPath,
      end: scenerio.end,
      fileName: scenerio.fileName,
      start: scenerio.start,
      url: scenerio.url,
    });
  });
}
