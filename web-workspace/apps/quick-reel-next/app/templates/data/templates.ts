export type VideoTemplate = {
  id: number;
  name: string;
  videoInfo: {
    fps: number;
    frameCount: number;
    frameSize: {
      width: number;
      height: number;
    };
    previewUrl: string;
    thumbnailUrl: string;
    audioUrl: string;
    editorUrl: string;
  };
};

export const templates: VideoTemplate[] = [
  {
    id: 8,
    name: "Hotel Highlight Reel",
    videoInfo: {
      fps: 30,
      frameCount: 422,
      frameSize: {
        height: 1920,
        width: 1080,
      },
      audioUrl:
        "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music.mp3",
      thumbnailUrl:
        "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-without-music-240p.mp4",
      previewUrl:
        "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music-video-720p.mp4",
      editorUrl:
        "https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-without-music-360p.mp4",
    },
  },
];
