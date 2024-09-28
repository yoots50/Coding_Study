import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf9;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf9;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf9;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  background-color: #1d9bf9;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState(""); // 트윗 내용
  const [file, setFile] = useState<File | null>(null); // 파일 저장 변수
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.target; // input으로 부터 파일들로 이루어진 배열을 받음 (복수의 파일을 받음), ?.은 옵셔널 체이닝 연산자로 e가 undefined이면 에러가 생기는 것을 방지해줌
    if (files && files.length === 1) {
      // 하지만 한 개의 파일만 받고 싶으므로 파일이 한 개인지 확인
      setFile(files[0]); // 배열의 0번째 파일을 file변수에 저장
    }
  };
  return (
    <Form>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="what is happening?"
      />
      <AttachFileButton htmlFor="file">
        {file ? "photo added ✅" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />{" "}
      {/* 이미지 파일만 받음 (확장자는 상관 x) */}
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
