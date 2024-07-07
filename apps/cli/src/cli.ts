import { createVideoStore } from "@via/store/video-store";

(async () => {
  try {
    const videosStore = createVideoStore("sqlite.db");

    // await videosStore.insert("http://video2");
    await videosStore.remove(1);
    const videos = await videosStore.list();
    console.log(videos);
  } catch (error) {
    console.error(error);
  }
})();
