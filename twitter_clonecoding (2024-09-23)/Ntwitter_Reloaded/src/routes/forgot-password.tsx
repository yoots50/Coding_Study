// #3.6 과제 (스스로 만듬)

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Form, Input, Wrapper } from "../components/auth-components";
import { useState } from "react";
import styled from "styled-components";
import { FirebaseError } from "firebase/app";

const Message = styled.span``;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    setMsg(""); // 메시지 초기화
    if (email === "") return; // 이메일이 빈칸이면 함수 종료
    try {
      await sendPasswordResetEmail(auth, email); // auth와 email을 받아  비밀번호 초기화 이메일을 보냄
      setMsg("success!"); // 성공하면 이 문구를 띄움
    } catch (e) {
      if (e instanceof FirebaseError) {
        setMsg(e.message); // 에러가 났다면 에러문구 띄움
      }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      // 이메일 value을 받으면
      setEmail(value); // email을 value로 바꿈
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          required
        />
        <Input type="submit" />
      </Form>
      <Message>{msg}</Message>
    </Wrapper>
  );
}
