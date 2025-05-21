import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SearchList from "../../components/SearchList/SearchList";

export default function Search() {
  const { searchId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function request() {
      await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchId}&key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData(res);
        });
    }
    request();
  }, [searchId]);
  return (
    <div>
      <SearchList data={data} />
    </div>
  );
}
