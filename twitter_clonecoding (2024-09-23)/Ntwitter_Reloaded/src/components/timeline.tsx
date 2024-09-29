import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  // interface는 클래스와 달리 내부에 함수를 작성하지 않고 변수의 내용과 타입만 작성함 출처:https://velog.io/@efforthye/6
  id: string;
  photo?: string; // photo값이 없을 수도 있음
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  
  useEffect(() => {
    let unsubscribe : Unsubscribe | null =  null; // 이벤트 리스너 해제
    const fetchTweets = async () => {
        const tweetsQuery = query(
          collection(db, "tweets"), // db안에 tweets 컬렉션을 대상으로 함
          orderBy("createdAt", "desc"), // 순서는 만들어진 시간을 내림차순으로
          limit(25) // 읽어오는 트윗 개수 제한
        );
        unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
          const tweets = snapshot.docs.map((doc) => {
            const { tweet, createdAt, userId, username, photo } = doc.data();
            return {
              tweet,
              createdAt,
              userId,
              username,
              photo,
              id: doc.id, // id는 저장되지 않고 doc의 이름이 id임
            };
          });
    
          setTweet(tweets);
        }); // 쿼리에 이벤트 리스너를 추가, 쿼리에 수정이 일어날 때 마다 해당 쿼리의 내용을 추출, unscribe 함수를 반환하는데 이는 이벤트 리스너를 계속 켜 놓으면 비용을 지불해야 하기 때문
      };
    fetchTweets();
    return () => {
        unsubscribe && unsubscribe(); // unsubscribe 값이 null이 아니면 함수 호출
    } // 해당 컴포넌트가 언마운트 될 때 호출
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} /> //  tweet의 나머지 값을 각각 순서에 맞게 넣어줌
      ))}
    </Wrapper>
  );
}
