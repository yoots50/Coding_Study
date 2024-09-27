import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate(); // 특정 라우터로 보냄
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* onChange로 들어오는 이벤트의 속성을 React.ChangeEvent<HTMLInputElement>로 바꿈, 타입스크립트에선 사용하는 타입이 다은 경우 오류가 나기에 타입을 지정해줘야 함 */
    const {
      target: { name, value } /* e에서 Input의 name과 value를 추출 */,
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); /* a나 submit태그는 누르게 되면 href를 통해 이동하거나 창이 새로고침됨, 이를 막기위해 preventDefault()를 사용함*/
    setError("");
    if (isLoading || email === "" || password == "") return; // 로딩중이거나 name, email, password중 하나가 빈 문자열이면 함수를 종료시킴
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password); // auth, email, password를 받아 로그인
      navigate("/"); // 홈화면으로 보냄
    } catch (e) {
      if (e instanceof FirebaseError)
        // instanceof를 통해 e가 FireBaseError 클래스인지 확인
        setError(e.message);
    } finally {
      setLoading(false);
    }

    console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log In"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        {" "}
        {/* 회원가입 페이지에서 로그인 페이지로 */}
        Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
