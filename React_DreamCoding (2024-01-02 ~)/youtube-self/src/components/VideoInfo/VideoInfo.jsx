import ReactMarkdown from "react-markdown";
import styles from "./VideoInfo.module.css";

import { Link } from "react-router";

export default function VideoInfo({ data, channelData }) {
  return (
    <div className={styles.info}>
      <div className={styles.title}>{data.items[0].snippet.title}</div>
      <Link
        to={`/channels/${channelData.items[0].id}`}
        className={styles.channel}
      >
        <img
          src={channelData.items[0].snippet.thumbnails.default.url}
          alt="description"
        />
        <h3>{channelData.items[0].snippet.title}</h3>
      </Link>
      <details className={styles.description}>
        <summary>more information...</summary>
        <ReactMarkdown>{data.items[0].snippet.description}</ReactMarkdown>
      </details>
    </div>
  );
}
