import styled from "styled-components";

// 공통적으로 쓰는 컴포넌트를 이쪽으로 옮김

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    /* input이면서 type가 submit인 것 */
    cursor: pointer;
    &:hover {
      /* 마우스 커서가 올라가면 */
      opacity: 0.8;
    }
  }
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;
