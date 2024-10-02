import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #47d4ff;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [isEdit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const user = auth.currentUser;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return; // 로그인 x, 로딩중, 트윗 내용 빈칸이면 제출 x
    try {
      setLoading(true);
      const editedDoc = doc(db, "tweets", id);
      await updateDoc(editedDoc, {
        tweet: editedTweet,
      });
      if (newFile !== null) {
        const locationRef = ref(storage, `tweets/${user.uid}/${editedDoc.id}`); // storage에 파일이 저장되는 경로 지정, 문서 id가 있어야 트윗이 삭제될 때 파일을 삭제하기 편함
        const result = await uploadBytes(locationRef, newFile);
        const url = await getDownloadURL(result.ref); // 업로드한 파일의 다운로드 경로를 만듬
        await updateDoc(doc(db, "tweets", id), {
          photo: url,
        }); // doc에 내용추가
        setNewFile(null);
      }
      setEdit(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id)); // document 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`); // 삭제하려는 글과 함께 있는 사진의 경로
        await deleteObject(photoRef); // 사진 삭제
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTweet(e.target.value);
  };
  const onEdit = async () => {
    if (user?.uid !== userId) return;
    setEdit(true);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.target; // input으로 부터 파일들로 이루어진 배열을 받음 (복수의 파일을 받음), ?.은 옵셔널 체이닝 연산자로 e가 undefined이면 에러가 생기는 것을 방지해줌
    if (files && files.length === 1 && files[0].size < 1024 * 1024) {
      // 하지만 한 개의 파일만 받고 싶으므로 파일이 한 개인지 확인
      setNewFile(files[0]); // 배열의 0번째 파일을 file변수에 저장
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEdit ? (
          <Form onSubmit={onSubmit}>
            <TextArea
              rows={5}
              maxLength={180}
              onChange={onChange}
              value={editedTweet}
              placeholder="Edit to..."
              required
            />
            <AttachFileButton htmlFor="newfile">
              {newFile ? "photo edited ✅" : "Edit Photo"}
            </AttachFileButton>
            <AttachFileInput
              onChange={onFileChange}
              type="file"
              id="newfile"
              accept="image/*"
            />
            <SubmitBtn
              type="submit"
              value={isLoading ? "Posting..." : "Edit Tweet"}
            />
            <CloseButton onClick={() => {setEdit(false)}}>Close</CloseButton>
          </Form>
        ) : (
          <>
            <Payload>{tweet}</Payload>
            {user?.uid === userId ? (
              <>
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                <EditButton onClick={onEdit}>Edit</EditButton>
              </>
            ) : null}
          </>
        )}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
