import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    if (files && files.length === 1 && files[0].size < 1024 * 1024) {
      // 하지만 한 개의 파일만 받고 싶으므로 파일이 한 개인지 확인
      setFile(files[0]); // 배열의 0번째 파일을 file변수에 저장
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return; // 로그인 x, 로딩중, 트윗 내용 빈칸이면 제출 x
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet, // tweet 내용
        createdAt: Date.now(), // 만들어진 시간
        username: user.displayName || "Anonymous", // 유저 이름
        userId: user.uid, // 유저 id 이 트윗을 삭제 할 때 트윗을 작성한 사람인지 확인해야 하기 때문
      }); // 새로운 document를 특정 collection에 생성
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`); // storage에 파일이 저장되는 경로 지정, 문서 id가 있어야 트윗이 삭제될 때 파일을 삭제하기 편함
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref); // 업로드한 파일의 다운로드 경로를 만듬
        await updateDoc(doc, {
          photo: url,
        }); // doc에 내용추가
        setTweet(""); // 트윗을 올리면 tweet, file 초기화
        setFile(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="what is happening?"
        required
      />
      <AttachFileButton htmlFor="file">
        {file ? "photo added ✅" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      {/* 이미지 파일만 받음 (확장자는 상관 x) */}
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
