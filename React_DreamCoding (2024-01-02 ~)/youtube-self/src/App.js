import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";
import Home from "./pages/Home/Home";
import Video from "./pages/video";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,

      children: [
        { index: true, element: <Home /> },
        {path:"/videos/:videoId", element: <Video/>}
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
