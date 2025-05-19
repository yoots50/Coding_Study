import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./Video.module.css";
import ReactMarkdown from "react-markdown";

export default function Video() {
  const { videoId } = useParams();
  const src = `http://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  const [videoData, setVideoData] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);

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
          setVideoData(res);
        });
    }
    request();
  }, []);

  useEffect(() => {
    if (videoData && videoData.items.length === 1) {
      const videoDataSnippet = videoData.items[0].snippet;
      setTitle(videoDataSnippet.title);
      setDescription(videoDataSnippet.description);
    }
  }, [videoData]);
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <iframe
          id="player"
          type="text/html"
          src={src}
          frameBorder="0"
          title="video"
          className={styles.video}
        ></iframe>
        <div className={styles.videoInfoContainer}>
          <div className={styles.title}>{title}</div>
          <details className={styles.description}>
            <summary>more information...</summary>
            <ReactMarkdown>{description}</ReactMarkdown>
          </details>
        </div>
      </div>
      <div>list of videos</div>
    </div>
  );
}
