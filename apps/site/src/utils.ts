import { useEffect } from "react";

export const executeOnce = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
