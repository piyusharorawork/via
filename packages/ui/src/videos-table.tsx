import type { ListVideosOutput } from "@via/core/video-manager";

type Props = {
  videos: ListVideosOutput;
  onVideoRowClick: (videoId: string) => void;
};

export const VideosTable = (props: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Desciption</th>
          </tr>
        </thead>
        <tbody>
          {props.videos.map((video, index) => {
            return (
              <tr
                key={video.uuid}
                className="cursor-pointer"
                onClick={() => props.onVideoRowClick(video.uuid)}
              >
                <th>{index + 1}</th>
                <td>{video.name}</td>
                <td>{video.description}</td>
              </tr>
            );
          })}
          {/* row 1 */}
        </tbody>
      </table>
    </div>
  );
};
