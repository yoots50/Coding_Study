import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import VideoThumbnail from "../../components/VideoThumbnail/VideoThumbnail";

export default function Search() {
  const { searchId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState([]);
  useEffect(() => {
    async function request() {
      await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchId}&key=${process.env.REACT_APP_API_KEY}`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((res) => {
          setLoading(true)
          setData(res);
        });
    }
    setLoading(false)
    request();
  }, [searchId]);
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
