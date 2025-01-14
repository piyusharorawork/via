import { StateCreator } from "zustand";
import { State } from "./store";

export type UserVideoSlice = {
  userVideo: UserVideo;
};

type UserVideo = {
  url: string;
  videoInfo: {
    fps: number;
    frameCount: number;
    frameSize: {
      width: number;
      height: number;
    };
  };
};

export const useUserVideoStore: StateCreator<
  State,
  [],
  [],
  UserVideoSlice
> = () => {
  return {
    userVideo: {
      url: "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736823131/rishikesh/v1-240p.mp4",
      videoInfo: {
        fps: 30,
        frameCount: 2339,
        frameSize: {
          width: 720,
          height: 1280,
        },
      },
    },
  };
};
