export type VideoTemplate = {
  id: number;
  name: string;
  videoURL: {
    high: string;
    low: string;
    combined: string;
  };
  videoInfo: {
    fps: number;
    frameCount: number;
    frameSize: {
      width: number;
      height: number;
    };
  };
};

export const templates: VideoTemplate[] = [
  {
    id: 8,
    name: "Hotel Highlight Reel",
    videoURL: {
      high: "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736600178/hotel-highlight-reel-original.mp4",
      low: "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736599645/render-forest.mp4",
      combined:
        "https://res.cloudinary.com/dmtxtgvsb/video/upload/v1736603169/combined.mp4",
    },
    videoInfo: {
      fps: 30,
      frameCount: 422,
      frameSize: {
        height: 1920,
        width: 1080,
      },
    },
  },
];
