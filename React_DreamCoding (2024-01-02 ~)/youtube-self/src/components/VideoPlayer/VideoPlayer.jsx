import styles from "./VideoPlayer.module.css"

export default function VideoPlayer({src}) {
    return (<div>
        <iframe
          id="player"
          type="text/html"
          src={src}
          frameBorder="0"
          title="video"
          className={styles.videoPlayer}
        ></iframe>
    </div>)
}