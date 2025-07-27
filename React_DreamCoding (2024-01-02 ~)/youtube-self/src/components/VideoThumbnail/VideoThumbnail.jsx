import { useEffect, useState } from "react";
import { Link } from "react-router";
export default function VideoThumbnail({ video, thumbnailsQuality, styles, isDarkMode, onDarkModeChange }) {
  const [isLoading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState([]);
  const videoThumbnails = (quality, video) => {
    switch (quality) {
      case "default":
        return video.snippet.thumbnails.default.url;
      case "medium":
        return video.snippet.thumbnails.medium.url;
      case "high":
        return video.snippet.thumbnails.high.url;
      default:
        console.error("Unknown Thumbnails Quality Value");
        return null;
    }
  };

  useEffect(() => {
    async function request() {
      if (video) {
        await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${process.env.REACT_APP_API_KEY}`,
          {
            method: "GET",
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.items[0].snippet) {
              setChannelData(res);
              setLoading(true);
            }
          });
      }
    }
    setLoading(false);
    request();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Link
          to={`/videos/${video.id.videoId}`}
          title={video.snippet.title}
          key={video.id.videoId}
          className={styles.video}
        >
          <img
            src={videoThumbnails(thumbnailsQuality, video)}
            alt="thumbnail"
            className={styles.thumbnails}
          />

          <div className={styles.info}>
            {video.snippet.title}
            <Link
              to={`/channels/${video.snippet.channelId}`}
              title={video.snippet.title}
              key={video.id.channelId}
              className={styles.channelTitle}
            >
              <img
                src={channelData.items[0].snippet.thumbnails.default.url}
                alt="channelThumbnail"
              />
              {video.snippet.channelTitle}
            </Link>
          </div>
        </Link>
      ) : null}
    </div>
  );
}
