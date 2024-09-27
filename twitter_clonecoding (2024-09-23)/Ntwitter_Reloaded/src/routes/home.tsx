import { auth } from "./firebase";

export default function Home() {
  const logOut = () => {
    auth.signOut(); // auth.signOut은 로그아웃을 함
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
}
