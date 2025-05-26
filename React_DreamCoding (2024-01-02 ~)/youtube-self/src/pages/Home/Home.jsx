import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./Home.module.css";
import VideoThumbnail from "../../components/VideoThumbnail/VideoThumbnail";
export default function Home() {
  const [data, setData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function request() {
      await fetch("data/data.json")
        .then((res) => res.json())
        .then((data) => {
          setLoading(true);
          setData(data);
        });
    }
    setLoading(false);
    request();
  }, []);
  return (
    <div className={styles.container}>
      {isLoading
        ? data.items &&
          data.items.map((video) => {
            return (
              <VideoThumbnail
                video={video}
                thumbnailsQuality="high"
                styles={styles}
              />
            );
          })
        : null}
    </div>
  );
}
