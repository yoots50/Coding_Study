import { ApolloServer, gql } from "apollo-server"; // const { ApolloServer, gql } = require("apollo-server") 와 같음

const typeDefs = gql`
  type User {
    id: ID! # 기본적으로 자료형은 nullable (null값을 가질 수 있음), 하지만 !가 있으면 null일 때 에러가 뜸. 이는 무조건적으로 필요한 데이터에 붙임으로써 null값을 받는 것을 방지 할 수 있음
    username: String!
    firstName: String!
    lastName: String
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query { # user에게 data를 보냄 (조회)
    allTweets: [Tweet!]! # Tweet의 list type (모든 Tweet 불러오기
    tweet(id: ID): Tweet! # Tweet의 id로 원하는 Tweet을 불러옴
  }
  type Mutation { # user가 보낸 data로 mutate하는 동작을 넣음 (등록/수정/삭제)
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`; // graphql은 data의 type를 써야함 (SDL), Query의 type는 의무적으로 써야함

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
