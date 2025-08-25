import { useQuery } from "@tanstack/react-query";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function VideoDescription({ videoData }) {
  const { videoId } = useParams();
  const { channelId } = videoData.snippet;
  const { youtube } = useYoutubeApi();
  const {
    isError,
    isLoading,
    data: channel,
  } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => youtube.searchByChannelId(channelId),
  });
  console.log(channel);
  return (
    <div
      style={{
        height: "70vh",
        width: "100wh",
      }}
    >
      <VideoPlayer videoId={videoId} />
      {videoData.snippet.title}
      {isLoading ? null : (
        <div className="flex">
          <img
            className="rounded-full w-10"
            src={channel.snippet.thumbnails.default.url}
          />
          {channel.snippet.title}
        </div>
      )}
      <div className="text-sm opacity-80 bg-neutral-800 my-5 rounded-lg">
        {videoData.snippet.description}
      </div>
    </div>
  );
}
