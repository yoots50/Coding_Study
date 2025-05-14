import { useParams } from "react-router";

export default function Video() {
    const {videoId} = useParams();
  return <>{videoId}</>;
}
