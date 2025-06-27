import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Channel({ isDarkMode, onDarkModeChange }) {
  const { channelId } = useParams();
  const [data, setData] = useState(undefined);
  const fetchUrl = "";
  const fetchArg = {};
  useEffect(() => {
    async function request() {
      await fetch(fetchUrl, fetchArg)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData(data);
        });
    }
    request();
  }, []);
  
  return <div>{channelId}</div>;
}
