import { useEffect, useState } from "react";
import { useParams } from "react-router";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import VideoList from "../../components/VideoList/VideoList";
import styles from "./Video.module.css";

export default function Video() {
  const { videoId } = useParams();
  const src = `http://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function request() {
      await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.items[0].snippet) {
            setData(res);
            setLoading(true);
          }
        });
    }
    setLoading(false);
    request();
  }, [videoId]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setListData(data);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={styles.container}>
          <div className={styles.videoContainer}>
            <VideoPlayer src={src} />
            <VideoInfo data={data} />
          </div>
          <VideoList data={listData} />
        </div>
      ) : null}
    </div>
  );
}
