import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./routes/firebase";

const router = createBrowserRouter([
  /* 라우터를 생성하여 RouteProvider로 보냄 */
  {
    path: "/" /* index주소로 들어가면 Layout 컴포넌트가 보여지게 됨 */,
    element: <Layout />,
    children: [
      /* Home과 Profile은 Layout 라우트 내부에서 render됨 */
      {
        path: "" /* 아무것도 없으면 Home 라우트가 보여지게 됨 */,
        element: <Home />,
      },
      {
        path: "profile" /* /profile으로 라우팅되면 Profile 라우트가 보임 */,
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login" /* login으로 라우팅되면 Login 라우트가 보임 */,
    element: <Login />,
  },
  {
    path: "/create-account" /* create-account으로 라우팅되면 CreateAccount 라우트가 보임 */,
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle` /* GlobalStyles를 만들어 모든 페이지에 같은 스타일이 적용되도록 함 */
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady(); /* 인증상태 준비 확인 */
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  });
  return (
    <Wrapper>
      <GlobalStyles /> {/* GlobalStyles 적용*/}
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      {/* router를 받아 해당 라우트를 보여줌 */}
    </Wrapper>
  );
}

export default App;
