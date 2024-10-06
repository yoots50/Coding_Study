import { ApolloServer, gql } from "apollo-server"; // const { ApolloServer, gql } = require("apollo-server") 와 같음

let tweets = [
  {
    id: "1",
    text: "first one!",
  },
  {
    id: "2",
    text: "second one!",
  },
];

let users = [
  {
    id: "1",
    firstName: "nico",
    lastName: "las",
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "Musk",
  },
];

const typeDefs = gql`
  type User {
    id: ID! # Field라고 불림, 기본적으로 자료형은 nullable (null값을 가질 수 있음), 하지만 !가 있으면 null일 때 에러가 뜸. 이는 무조건적으로 필요한 데이터에 붙임으로써 null값을 받는 것을 방지 할 수 있음
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query { # user에게 data를 보냄 (조회)
    allUsers: [User!]!
    allTweets: [Tweet!]! # Tweet의 list type (모든 Tweet 불러오기
    tweet(id: ID!): Tweet # Tweet의 id로 원하는 Tweet을 불러옴
  }
  type Mutation { # user가 보낸 data로 mutate하는 동작을 넣음 (등록/수정/삭제)
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`; // graphql은 data의 type를 써야함 (SDL), Query의 type는 의무적으로 써야함

const resolvers = {
  // field 요청이 들어오면 그 field에 대한 값을 반환함
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) { // root는 해당 field의 상위 field를 가르킴
      // 유저가 보낸 arguments(Query에 넣은 인수, 여기서는 tweet의 id)는 항상 두번째 argment임
      return tweets.find((tweet) => tweet.id === id); // 유저가 찾고자하는 tweet의 id와 같은 tweet 반환
    },
    allUsers() {
      console.log("allUsers called!");
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      // 유저가 tweet을 올릴 때 사용, root를 _으로도 씀
      const newTweet = {
        // 유저가 만든 새로운 tweet
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet); // tweets에 newtweet 추가
      return newTweet; // newtweet 반환
    },
    deleteTweet(_, { id }) {
      // 유저가 tweet을 삭제할 때 사용
      const tweet = tweets.find((tweet) => tweet.id === id); // 삭제하고하 하는 tweet의 id와 같은 tweet을 찾음
      if (!tweet) return false; // 찾지 못하면 false를 반환
      tweets = tweets.filter((tweet) => tweet.id !== id); // tweets를 삭제하고자 하는 tweet의 id와 같은 tweet을 삭제한 tweets로 바꿈
      return true; // true 반환
    },
  },
  User: {
    fullName({firstName, lastName}) { // root는 fullName을 가진 user를 가짐, root를 firstName, lastName으로 쪼갬
      return `${firstName} ${lastName}`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
