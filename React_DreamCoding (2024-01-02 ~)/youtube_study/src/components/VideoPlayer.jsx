import React from "react";

export default function VideoPlayer({ videoId }) {
  return (
    <iframe
      id="player"
      type="text/html"
      src={`http://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      className="w-full h-full"
    ></iframe>
  );
}
