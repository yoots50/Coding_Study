import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import VideoCard from "../components/VideoCard";
import { useEffect, useState } from "react";
import VideoDescription from "../components/VideoDescription";

export default function VideoDetail() {
  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isError,
    isLoading,
    data: videoData,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => youtube.searchByVideoId(videoId),
  });
  const {
    isError2,
    isLoading2,
    data: videos,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () => youtube.search(),
  });

  return (
    <div className="px-20">
      {videoData ? (
        <div
          className="grid grid-cols-2 gap-10"
          style={{
            gridTemplateColumns: "4fr 1fr",
          }}
        >
          {!isLoading ? <VideoDescription videoData={videoData}/> : null}
          <div>
            {videos && (
              <ul className="grid row-auto gap-y-4">
                {videos.map((video) => {
                  return (
                    <div>
                      <VideoCard key={video.id} video={video} />
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
