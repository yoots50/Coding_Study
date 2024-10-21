import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({ // Apollo client 생성
  uri: "http://localhost:4000/", // https://github.com/yoots50/Coding_Study/tree/master/GraphQL_for_beginners%20(2024-10-04%20~%202024-10-07)를 구동한 서버의 주소
  cache: new InMemoryCache(),
});

export default client;
