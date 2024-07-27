import axios from "axios";

type Video = {
  id: number;
  description: string;
};

type FindVideoInput = {
  videos: Video[];
  prompt: string;
};

export const findVideo = async (input: FindVideoInput): Promise<number> => {
  const url = "http://192.168.1.7:3000/ollama/api/chat";

  let videoList = "";
  for (let i = 0; i < input.videos.length; i++) {
    const video = input.videos[i];
    videoList += `${i + 1}. Video ID: ${video?.id}, Description: ${video?.description}\n`;
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
      
      You: What is the video ID for the ${input.videos[3]?.description}?
      AI: 4.
      
      You: What is the video ID for the ${input.videos[0]?.description}?
      AI:  1.
      
      You: What is the video ID for the ${input.videos[2]?.description}?
      AI:  3.`,
    },
    {
      role: "assistant",
      content:
        "I'm ready when you are. Go ahead and ask me any questions about the videos!What's your first question?",
    },
    {
      role: "user",
      content: `What is the video ID for the ${input.videos[1]?.description}`,
    },
    {
      role: "assistant",
      content: "2",
    },
    {
      role: "user",
      content: `${input.prompt}`,
    },
  ];

  const body = {
    model: "llama3:latest",
    stream: false,
    options: {},
    messages,
  };
  const res = await axios.post(url, body, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1NmY0MjU3LTk1NDMtNGFlNi04OGFhLTU5YzI5OTI0OTQ0ZiJ9.YWc2jGJmz4z-TK2CjvnZfbTw6wDPRlpKEYqe_QeQfNY",
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
};
