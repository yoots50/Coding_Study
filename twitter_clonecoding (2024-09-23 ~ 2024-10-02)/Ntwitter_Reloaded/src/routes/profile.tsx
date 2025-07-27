import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 22px;
`;

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
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

export default function Profile() {
  const user = auth.currentUser; // 현재 user 받기
  const [avatar, setAvatar] = useState(user?.photoURL); // 유저의 프로필 사진 url
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isEdit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState(user?.displayName ?? "Anonymous")
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return; // 로그인이 안되어있다면 함수 끝
    if (files && files.length === 1) {
      // 파일이 1개이면
      const file = files[0]; // 0번째 파일을 지정
      const locationRef = ref(storage, `avatars/${user?.uid}`); // 다음과 같은 경로를 ref로 지정
      const result = await uploadBytes(locationRef, file); // 파일 업로드
      const avatarUrl = await getDownloadURL(result.ref); // 업로드 된 파일 url
      setAvatar(avatarUrl); // 업로드 된 파일을 유저 아바타로 지정
      await updateProfile(user, {
        // 아바타url을 프로필url로 지정
        photoURL: avatarUrl,
      });
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedName(e.target.value);
  };
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateProfile(user, {
        displayName: editedName,
      });
      setEdit(false);
    } catch (e) {
      console.log(e);
    } finally {
      
    }
  };
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid), // userId가 현재 유저id와 같은 것만 추림
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <Name>
        {isEdit ? null : user?.displayName ?? "Anonymous"}
        {/* a ?? b: a가 null 또는 undefined 이면 b를, 아닌 경우엔 a를 반환 */}
      </Name>
      {user?.displayName ? (isEdit ? (
        <Form onSubmit={onSubmit}>
          <TextArea
            rows={1}
            maxLength={20}
            onChange={onChange}
            value={editedName}
            placeholder="Edit to..."
            required
          />
          <EditButton type="submit">Done</EditButton>
          <CloseButton
            onClick={() => {
              setEdit(false);
            }}
          >
            Close
          </CloseButton>
        </Form>
      ) : (
        <EditButton
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </EditButton>
      )) : null}
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
