import styled, { css } from "styled-components";
import "./App.css";
import Button1 from "./components/Button1";
import Button2 from "./components/Button2";
import TailwindComponent from "./TailwindComponents";

const Container = styled.div`
  display: flex;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #3c5b69;
  color: #b9eaff;
  margin: 0 1rem;
  padding: 0.25em 1em;
  ${(props) =>
    props.primary &&
    css`
      background: #009cd5;
      color: white;
    `}// props를 전달 받았을 때 props가 primary이면 css 적용
`;

function App() {
  return (
    <>
      <Button1 />
      <Button2 />
      <Container>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </Container>
      <TailwindComponent/>
    </>
  );
}

export default App;
