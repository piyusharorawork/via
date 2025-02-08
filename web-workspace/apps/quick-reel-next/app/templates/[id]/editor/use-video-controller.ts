// import { store } from "@/store/store";
// import { useSelector } from "@xstate/store/react";
// import { useEffect } from "react";

// export const useVideoController = (
//   videoRef: React.RefObject<HTMLVideoElement>,
//   fps: number
// ) => {
//   const videoPlaying = useSelector(
//     store,
//     (state) => state.context.videoPlaying
//   );

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (videoPlaying) {
//       video.play();
//     } else {
//       video.pause();
//     }
//   }, [videoRef.current, fps, videoPlaying]);
// };
