// import { RefObject, useEffect } from "react";
// import { VideoStatus } from "./play-button";
// import { store } from "@/store/store";

// export const useUpdateFrameNumber = (
//   status: VideoStatus,
//   audioRef: RefObject<HTMLAudioElement>,
//   fps: number
// ) => {
//   useEffect(() => {
//     if (status === "paused") {
//       audioRef.current?.pause();
//       return;
//     }
//     audioRef.current?.play();

//     let animationFrameId: number | null = null;
//     let lastTime = performance.now();

//     const update = (currentTime: number) => {
//       const timeElapsed = currentTime - lastTime;
//       const frameDuration = 1000 / fps;
//       if (timeElapsed > frameDuration) {
//         store.send({ type: "incementFrame" });
//         lastTime += frameDuration;
//       }
//       animationFrameId = requestAnimationFrame(update);
//     };
//     animationFrameId = requestAnimationFrame(update);

//     return () => {
//       if (animationFrameId === null) return;
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [status, fps, audioRef.current]);
// };
