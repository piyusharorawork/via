import axios from "axios";

type Video = {
  id: number;
  description: string;
};

type FindVideoInput = {
  videos: Video[];
  prompt: string;
};

type VideoFinderConfig = {
  url: string;
  token: string;
  model: string;
};

export class VideoFinder {
  private url: string;
  private token: string;
  private model: string;

  constructor(config: VideoFinderConfig) {
    this.url = config.url;
    this.token = config.token;
    this.model = config.model;
  }

  async findVideo(input: FindVideoInput): Promise<number> {
    try {
      let videoList = "";
      for (let i = 0; i < input.videos.length; i++) {
        const video = input.videos[i];
        videoList += `Video ID: ${video?.id}, Description: ${video?.description}\n`;
      }

      const messages = [
        {
          role: "user",
          content: `
          I have a list of videos with their IDs and descriptions. 
          Here is the list:
          ${videoList}
          
          Given a description, you will provide you with the corresponding video ID.
          Also be aware that the desciption need not match exactly .
          Just select the one which matches the most by meaning or context
          You must only return the id the video and nothing else 
          You must return respond with id only not anything else 
          
          You: What is the video ID for the Maa Durga?
          AI: 1.
          
          You: What is the video ID for the Ganapati bappa morya ?
          AI: 4.
          
          You: What is the video ID for the Har har mahadev?
          AI: 2.
          
          You: What is the video ID for the brother of lord lakshman?
          AI: 5.
          
          `,
        },
        {
          role: "assistant",
          content:
            "I'm ready when you are. Go ahead and ask me any questions about the videos!What's your first question?",
        },
        {
          role: "user",
          content: `What is the video ID for the Lord Shiva`,
        },
        {
          role: "assistant",
          content: "2",
        },
        {
          role: "user",
          content: `What is the video ID for the protective nature`,
        },
        {
          role: "assistant",
          content: "1",
        },
        {
          role: "user",
          content: `What is the video ID for the ${input.prompt}`,
        },
      ];

      const body = {
        model: this.model,
        stream: false,
        options: {},
        messages,
      };
      const url = this.url;
      const res = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const videoId = parseInt(res.data.message.content);

      // To ensure only those video id should be returned that is there in the list
      // TODO some randomisation can be added
      const allVideoIds = input.videos.map((video) => video.id);
      if (allVideoIds.indexOf(videoId) < 0) {
        return allVideoIds[0]!;
      }

      return videoId;
    } catch (error) {
      throw error;
    }
  }
}
