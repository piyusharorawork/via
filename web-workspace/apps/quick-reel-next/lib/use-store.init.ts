import React from "react";
import { IStorage } from "./storage";

//type Callback = <Store>(storage: IStorage) => Store;

export const useStoreInit = <Store>(callback: (storage: IStorage) => Store) => {
  const storeRef = React.useRef<Store | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    // const { createVideoAnalyserStore } = require("../video-analyser/store");
    storeRef.current = callback(localStorage);
    // storeRef.current = createVideoAnalyserStore(localStorage);
    const windowRef = window as any;
    windowRef.videoAnalyserStore = storeRef.current;
    setIsReady(true);
  }, []);

  return {
    store: storeRef.current,
    isReady,
  };
};
