import React from "react";
import { formatAgo } from "../util/date";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const videoId = video.id;
  return (
    <Link to={`/videos/watch/${videoId}`}>
    <li>
      <img className="w-full" src={thumbnails.medium.url} alt={title} />
      <div>
        <p className="font-semibold my-2 line-clamp-2">{title}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
      </div>
    </li>
    </Link>
  );
}
