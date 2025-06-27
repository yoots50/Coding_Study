import { useEffect, useState } from "react";
import { useParams } from "react-router";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import styles from "./Video.module.css";
import VideoThumbnail from "../../components/VideoThumbnail/VideoThumbnail";

export default function Video({ isDarkMode, onDarkModeChange }) {
  const { videoId } = useParams();
  const src = `http://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState([]);

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
          }
        });
    }
    request();
  }, [videoId]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setListData(data);
      });
  }, []);

  useEffect(() => {
    async function request() {
      if (data.items) {
        await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.items[0].snippet.channelId}&key=${process.env.REACT_APP_API_KEY}`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
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
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <div className={styles.container}>
          <div className={styles.videoContainer}>
            <VideoPlayer src={src} />
            <VideoInfo data={data} channelData={channelData} />
          </div>
          <div className={styles.listContainer}>
            {listData.items &&
              listData.items.map((video) => {
                return (
                  <VideoThumbnail
                    video={video}
                    thumbnailsQuality="default"
                    styles={styles}
                  />
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
