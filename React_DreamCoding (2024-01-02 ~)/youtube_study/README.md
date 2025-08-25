# DreamCoding React Study - Youtube clone coding

## 12.2 - 12.3 라우터 설정하기

### 내가 만든 것

```jsx
// App.js

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Videos from "./pages/Videos/Videos";
import Watch from "./pages/Watch/Watch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Videos />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      {
        path: "/videos/:query",
        element: <Videos />,
      },
      {
        path: "/videos/watch/:id",
        element: <Watch />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### 강의에서 만든 것

```jsx
// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import App from "./App";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      { path: "videos", element: <Videos /> },
      { path: "videos/:keyword", element: <Videos /> },
      { path: "videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## 12.4 - 12.6 검색 헤더 만들기

### 내가 만든 것

```jsx
// Navbar.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleChange = (e) => {
    setKeyword((prev) => e.target.value);
  };
  const handleSubmit = (e) => {
    navigate(`/videos/${keyword}`);
  };
  return (
    <div class="flex">
      <Link to={"/"} class="ml-"><h1 class="text-3xl font-bold text-white">Youtube</h1></Link>
      <form onSubmit={handleSubmit} class="m-auto">
        <input
          placeholder="search..."
          type="text"
          onChange={handleChange}
          value={keyword}
        ></input>
        <button>🔎</button>
      </form>
    </div>
  );
}

// Videos.jsx

import React from "react";
import { useParams } from "react-router-dom";

export default function Videos() {
  const {keyword} = useParams("keyword")
  return <div>Videos {keyword}</div>;
}
```

### 강의에서 만든 것

```jsx
// SearchHeader.jsx

import React, { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };
  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);
  return (
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link to="/" className="flex items-center">
        <BsYoutube className="text-4xl text-brand"/>
        <h1 className="font-bold ml-2 text-3xl">Youtube</h1>
      </Link>
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
        className="w-7/12 p-2 outline-none bg-black text-gray-50"
          type="text"
          placeholder="Search..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}

// Video.jsx

import React from "react";
import { useParams } from "react-router-dom";

export default function Videos() {
  const { keyword } = useParams();
  return <div>Videos {keyword ? `🔎${keyword}` : "🔥"}</div>;
}
```

## 12.7 ~ 12.13 비디오 목록 만들기

### 내가 만든 것

```jsx
// Videos.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Videos() {
  const KEY = process.env.REACT_APP_API_KEY;
  const { keyword } = useParams();
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const response = async () => {
      await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=${KEY}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setVideos(res);
          setLoading(false);
        });
    };
    response();
  }, [keyword]);
  return (
    <div>
      Videos{" "}
      {isLoading ? null : (
        <div>
          {videos.items.map((video) => {
            return <div key={video.id.videoId}>{video.snippet.title}</div>;
          })}
        </div>
      )}
    </div>
  );
}
```

### 강의에서 만든 것

```jsx
// fakeYoutubeClient.js
import axios from "axios";

export default class FakeYoutubeClient {
  async search() {
    return axios.get("videos/search.json");
  }

  async videos() {
    return axios.get("videos/popular.json");
  }
}


// youtubeClient.js
import axios from "axios";

export default class YoutubeClient {
  constructor(apiClient) {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_API_KEY },
    });
  }
  async search(params) {
    return this.httpClient.get("search", params);
  }

  async videos(params) {
    return this.httpClient.get("videos", params);
  }
}

//youtube.js
export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostpopular",
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
}
```

## 12.14 비디오 카드 만들기

### 내가 만든 것

```jsx
// VideoCard.jsx

import React from "react";

export default function VideoCard({ video }) {
  const timeString = video.snippet.publishedAt;
  const MAX_TITLE_LEN = 60;
  const time = {
    year: parseInt(timeString.slice(0, 4)),
    month: parseInt(timeString.slice(5, 7)),
    day: parseInt(timeString.slice(8, 10)),
    hour: parseInt(timeString.slice(11, 13)),
    minute: parseInt(timeString.slice(14, 16)),
    second: parseInt(timeString.slice(17, 19)),
  };

  const timeCalc = (time) => {
    const today = new Date();
    const todayTime = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
      hour: today.getHours(),
      minute: today.getMinutes(),
      second: today.getSeconds(),
    };
    const calculatedTime = {
      year: todayTime.year - time.year,
      month: todayTime.month - time.month,
      day: todayTime.day - time.day,
      hour: todayTime.hour - time.hour,
      minute: todayTime.minute - time.minute,
      second: todayTime.second - time.second,
    };
    if (calculatedTime.year > 0) {
      return { time: calculatedTime.year, type: "year" };
    }
    if (calculatedTime.month > 0) {
      return { time: calculatedTime.month, type: "month" };
    }
    if (calculatedTime.day > 0) {
      return { time: calculatedTime.day, type: "day" };
    }
    if (calculatedTime.hour > 0) {
      return { time: calculatedTime.hour, type: "hour" };
    }
    if (calculatedTime.minute > 0) {
      return { time: calculatedTime.minute, type: "minute" };
    }
    if (calculatedTime.second > 0) {
      return { time: calculatedTime.second, type: "second" };
    }
    return { time: null, type: "null" };
  };
  const calTime = timeCalc(time);
  return (
    <div
      style={{
        height: "100%",
        margin: "10px",
      }}
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "5px",
        }}
      />
      <div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "25px",
            marginBottom: "10px",
          }}
        >
          {video.snippet.title.length > MAX_TITLE_LEN
            ? video.snippet.title.slice(0, MAX_TITLE_LEN + 1) + "..."
            : video.snippet.title}
        </div>
        <div
          style={{
            fontSize: "15px",
          }}
        >
          {video.snippet.channelTitle}
        </div>
        <div
          style={{
            fontSize: "15px",
          }}
        >{`${calTime.time} ${calTime.type}${
          calTime.time > 1 ? "s" : ""
        } ago`}</div>
      </div>
    </div>
  );
}

// Videos.jsx
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import "./Videos.css";

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => youtube.search(keyword),
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
      }}
    >
      <div>Videos {keyword ? `🔎${keyword}` : "🔥"}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul className="videos">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </div>
  );
}
```

```css
// Videos.css
.videos {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
}

@media screen and (min-width: 600px) {
  .videos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .videos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }
}

@media screen and (min-width: 1024px) {
  .videos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
  }
}

@media screen and (min-width: 1536px) {
  .videos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
  }
}
```

### 강의에서 만든 것

```jsx
// VideoCard.jsx
import React from "react";
import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  return (
    <li>
      <img className="w-full" src={thumbnails.medium.url} alt={title} />
      <div>
        <p className="font-semibold my-2 line-clamp-2">{title}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
}

// Videos.jsx
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => youtube.search(keyword),
  });
  return (
    <>
      <div>Videos {keyword ? `🔎${keyword}` : "🔥"}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gay-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}

// date.js
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

export function formatAgo(date, lang = "en_US") {
  return format(date, lang);
}

```

## 12.17 상세페이지 만들기

### 내가 만든 것

```jsx
// VideoDetail.jsx
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import VideoCard from "../components/VideoCard";
import { useEffect, useState } from "react";
import VideoDescription from "../components/VideoDescription";

export default function VideoDetail() {
  const { videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isError,
    isLoading,
    data: videoData,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => youtube.searchByVideoId(videoId),
  });
  const {
    isError2,
    isLoading2,
    data: videos,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () => youtube.search(),
  });

  return (
    <div className="px-20">
      {videoData ? (
        <div
          className="grid grid-cols-2 gap-10"
          style={{
            gridTemplateColumns: "4fr 1fr",
          }}
        >
          {!isLoading ? <VideoDescription videoData={videoData}/> : null}
          <div>
            {videos && (
              <ul className="grid row-auto gap-y-4">
                {videos.map((video) => {
                  return (
                    <div>
                      <VideoCard key={video.id} video={video} />
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// VideoDescription
import { useQuery } from "@tanstack/react-query";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function VideoDescription({ videoData }) {
  const { videoId } = useParams();
  const { channelId } = videoData.snippet;
  const { youtube } = useYoutubeApi();
  const {
    isError,
    isLoading,
    data: channel,
  } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => youtube.searchByChannelId(channelId),
  });
  console.log(channel);
  return (
    <div
      style={{
        height: "70vh",
        width: "100wh",
      }}
    >
      <VideoPlayer videoId={videoId} />
      {videoData.snippet.title}
      {isLoading ? null : (
        <div className="flex">
          <img
            className="rounded-full w-10"
            src={channel.snippet.thumbnails.default.url}
          />
          {channel.snippet.title}
        </div>
      )}
      <div className="text-sm opacity-80 bg-neutral-800 my-5 rounded-lg">
        {videoData.snippet.description}
      </div>
    </div>
  );
}

// VideoPlayer
import React from "react";

export default function VideoPlayer({ videoId }) {
  return (
    <iframe
      id="player"
      type="text/html"
      src={`http://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      className="w-full h-full"
    ></iframe>
  );
}

// youtube.js
export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async searchByVideoId(videoId) {
    return this.#searchByVideoId(videoId);
  }
  async searchByChannelId(channelId) {
    return this.#searchByChannelId(channelId);
  }
  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostpopular",
        },
      })
      .then((res) => res.data.items);
  }

  async #searchByVideoId(videoId) {
    return this.apiClient
      .videoIdSearch({
        params: {
          part: "snippet",
          id: videoId,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async #searchByChannelId(channelId) {
    return this.apiClient
      .channelIdSearch({
        params: {
          part: "snippet",
          id: channelId,
        },
      })
      .then((res) => res.data.items[0]);
  }
}
```
