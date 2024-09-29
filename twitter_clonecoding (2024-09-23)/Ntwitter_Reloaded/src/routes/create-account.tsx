import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* onChange로 들어오는 이벤트의 속성을 React.ChangeEvent<HTMLInputElement>로 바꿈, 타입스크립트에선 사용하는 타입이 다은 경우 오류가 나기에 타입을 지정해줘야 함 */
    const {
      target: { name, value } /* e에서 Input의 name과 value를 추출 */,
    } = e;
    if (name === "name") {
      /* Input이 많을 땐 이런식으로 name으로 분류하여 어떤 Input값에 value를 넣었는지 확인 후 값을 변경함, 자주쓰는 방식이므로 중요 */
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); /* a나 submit태그는 누르게 되면 href를 통해 이동하거나 창이 새로고침됨, 이를 막기위해 preventDefault()를 사용함*/
    setError("");
    if (isLoading || name === "" || email === "" || password == "") return; // 로딩중이거나 name, email, password중 하나가 빈 문자열이면 함수를 종료시킴
    try {
      setLoading(true);
      const creadentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); // auth(인증 서비스), 이메일, 패스워드를 받아 유저를 만듬
      console.log(creadentials.user);
      await updateProfile(creadentials.user, {
        // 유저의 이름을 name으로 변경
        displayName: name,
      });
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
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
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
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        {" "}
        {/* 로그인 페이지에서 회원가입 페이지로 */}
        Already have an account? <Link to="/login">Log In &rarr;</Link>
      </Switcher>
      <Switcher>
        <Link to="/forgot-password">I forgot my Password</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
