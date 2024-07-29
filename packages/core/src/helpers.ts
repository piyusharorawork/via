export const formFileURL = (fileName: string) => {
  const videoURL = `http://localhost:4000/uploads/${fileName}`;
  return videoURL;
};

export const getEnvVariables = () => {
  const finderURL = process.env.FINDER_URL;
  const token = process.env.OLLAMA_TOKEN;
  const databaseName = process.env.DATABASE_NAME;
  const serverBaseURL = process.env.SERVER_BASE_URL;

  if (!finderURL) {
    throw "no FINDER_URL";
  }

  if (!token) {
    throw "no OLLAMA_TOKEN";
  }

  if (!databaseName) {
    throw "no DATABASE_NAME";
  }

  if (!serverBaseURL) {
    throw "no SERVER_BASE_URL";
  }
  return { finderURL, token, databaseName, serverBaseURL };
};
