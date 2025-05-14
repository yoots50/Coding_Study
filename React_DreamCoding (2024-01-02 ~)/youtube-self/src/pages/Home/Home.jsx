import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./Home.module.css"
export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        setVideos(data.items);
      });
  }, []);
  return (
    <div className={styles.videos}>
      {videos.map((video) => {
        return (
          <Link
            to={`/videos/${video.id.videoId}`}
            title={video.snippet.title}
            key={video.id.videoId}
            className={styles.video}
          >
            <img src={video.snippet.thumbnails.default.url} alt="thumbnail" className={styles.thumbnail}/>
            <h3 className={styles.title}>{video.snippet.title}</h3>
          </Link>
        );
      })}
    </div>
  );
}
