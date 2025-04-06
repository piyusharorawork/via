import { VideoPlayerStoreProvider } from "./video-player-store-provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return <VideoPlayerStoreProvider>{props.children}</VideoPlayerStoreProvider>;
}
