export type VideoTemplate = {
  id: number;
  name: string;
  videoURL: {
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
      low: "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-without-music-240p.mp4",
      combined:
        "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music-video-720p.mp4",
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
