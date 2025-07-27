import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
import Channel from "./pages/Channel/Channel";
import Search from "./pages/Search/Search";
import { DarkModeProvider } from "./components/context/DarkModeContext";
import { useState } from "react";

function App() {
  const [isDarkMode, setDarkMode] = useState(false)
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DarkModeProvider>
          <Root isDarkMode={isDarkMode} onDarkModeChange={setDarkMode} />
        </DarkModeProvider>
      ),
      errorElement: (
        <DarkModeProvider>
          <ErrorPage isDarkMode={isDarkMode} onDarkModeChange={setDarkMode} />
        </DarkModeProvider>
      ),

      children: [
        {
          index: true,
          element: (
            <DarkModeProvider>
              <Home isDarkMode={isDarkMode} onDarkModeChange={setDarkMode} />
            </DarkModeProvider>
          ),
        },
        {
          path: "/videos/:videoId",
          element: (
            <DarkModeProvider>
              <Video isDarkMode={isDarkMode} onDarkModeChange={setDarkMode} />
            </DarkModeProvider>
          ),
        },
        {
          path: "/channels/:channelId",
          element: (
            <DarkModeProvider>
              <Channel isDarkMode={isDarkMode} onDarkModeChange={setDarkMode} />
            </DarkModeProvider>
          ),
        },
        {
          path: "/search/:searchId",
          element: (
            <DarkModeProvider>
              <Search isDarkMode={isDarkMode} onDarkModeChange={setDarkMode} />
            </DarkModeProvider>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
