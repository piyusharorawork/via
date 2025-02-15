import { useCallback } from "react";

export const useLoadImage = (callback: (image: HTMLImageElement) => void) => {
  return useCallback((image: HTMLImageElement | null) => {
    if (!image) return;
    callback(image);
  }, []);
};
