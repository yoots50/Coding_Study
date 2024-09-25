import { Outlet } from "react-router-dom";

export default function Layout() {
  return ( 
  /* 라우터에 특정 값이 들어가면 Outlet이 Home이나 Profile 등으로바뀜 */
    <>
      <h2>layout</h2> 
      <Outlet /> 
    </>
  );
}
