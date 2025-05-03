import React from "react";
import { IStorage } from "./storage";

export const useStoreInit = <Store>(callback: (storage: IStorage) => Store) => {
  const storeRef = React.useRef<Store | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    storeRef.current = callback(localStorage);
    const windowRef = window as any;
    windowRef.videoAnalyserStore = storeRef.current;
    setIsReady(true);
  }, []);

  return {
    store: storeRef.current,
    isReady,
  };
};
