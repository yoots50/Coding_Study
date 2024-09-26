import { useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] { /* input이면서 type가 submit인 것 */
        cursor: pointer;
        &:hover { /* 마우스 커서가 올라가면 */
            opacity:0.8;
        }
    }
`;

const Error = styled.span`
    font-weight:600;
    color:tomato;
`;

export default function CreateAccount() {
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); /* a나 submit태그는 누르게 되면 href를 통해 이동하거나 창이 새로고침됨, 이를 막기위해 preventDefault()를 사용함*/
    try {
      // create an account
      // set the name of the user
      // redirect to the homepage
    } catch (e) {
      // setError
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
    </Wrapper>
  );
}
