import { store } from "@/store/store";
import { useCallback } from "react";

export const useLoadAudio = () => {
  return useCallback((audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.currentTime = 0;
    audio.pause();
    store.send({ type: "setAudioElement", audioElement: audio });
  }, []);
};
