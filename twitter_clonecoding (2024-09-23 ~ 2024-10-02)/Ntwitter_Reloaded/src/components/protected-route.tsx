import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser; // auth.currentuser는 현재 로그인 된 상태면 user를, 아니면 null을 보냄
  if (user === null) {
    // 로그인 하지 않았다면 로그인 페이지로 보냄
    return <Navigate to="login" />;
  }

  return children; // 로그인 했다면 children을 return
}
