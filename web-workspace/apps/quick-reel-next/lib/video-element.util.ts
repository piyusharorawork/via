export const updateVideoSrc = (
  videoElement: HTMLVideoElement | null,
  videoUrl: string
) => {
  if (!videoElement) return;
  if (videoUrl === "") return;

  videoElement.pause(); // Stop current playback
  videoElement.srcObject = null; // Clear the current source object
  videoElement.removeAttribute("src"); // Clear the old source
  videoElement.load(); // Load the new source

  videoElement.src = videoUrl;
  videoElement.currentTime = 0;
  videoElement.load();
};
