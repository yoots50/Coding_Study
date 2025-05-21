import ReactMarkdown from "react-markdown";
import styles from "./VideoInfo.module.css";
import { useEffect, useState } from "react";

import { Link } from "react-router";

export default function VideoInfo({ data }) {
  const [channelData, setChannelData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    async function request() {
      await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.items[0].snippet.channelId}&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.items[0].snippet) {
            console.log(res);
            setChannelData(res);
            setLoading(true);
          }
        });
    }
    setLoading(false);
    request();
  }, [data]);
  return (
    <div className={styles.info}>
      <div className={styles.title}>{data.items[0].snippet.title}</div>
      {isLoading ? (
          <Link to={`/channels/${channelData.items[0].id}`} className={styles.channel}>
            <img src={channelData.items[0].snippet.thumbnails.default.url} />
            <h3>{channelData.items[0].snippet.title}</h3>
          </Link>
      ) : null}
      <details className={styles.description}>
        <summary>more information...</summary>
        <ReactMarkdown>{data.items[0].snippet.description}</ReactMarkdown>
      </details>
    </div>
  );
}
