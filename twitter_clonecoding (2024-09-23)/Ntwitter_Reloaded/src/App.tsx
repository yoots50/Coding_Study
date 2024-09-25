import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path: "/",  /* index주소로 들어가면 Layout 컴포넌트가 보여지게 됨 */
    element: <Layout />,
    children: [
      {
        path: "", /* 아무것도 없으면 Home 컴포넌트가 보여지게 됨 */
        element: <Home />,
      },
      {
        path: "profile", /* /profile으로 라우팅되면 Profile 컴포넌트가 보임*/
        element: <Profile />,
      },
    ],
  },
  {
    path:"/login",
    element:<Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  body {
    background-color: black;
  }
`

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
