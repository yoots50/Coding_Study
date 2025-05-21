import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import styles from "./VideoList.module.css";

export default function VideoList({ data }) {
  return (
    <div className={styles.container}>
      {data.items &&
        data.items.map((video) => {
          return (
            <Link
              to={`/videos/${video.id.videoId}`}
              title={video.snippet.title}
              key={video.id.videoId}
              className={styles.video}
            >
              <img src={video.snippet.thumbnails.default.url} alt="thumbnail" />

              <div className={styles.info}>
                {video.snippet.title}
                <Link
                  to={`/channels/${video.snippet.channelId}`}
                  title={video.snippet.title}
                  key={video.id.channelId}
                  className={styles.channelTitle}
                >
                  {video.snippet.channelTitle}
                </Link>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
