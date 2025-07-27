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

## 12.7 비디오 목록 만들기

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