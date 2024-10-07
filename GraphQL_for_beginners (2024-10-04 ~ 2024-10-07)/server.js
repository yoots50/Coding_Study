import { ApolloServer, gql } from "apollo-server"; // const { ApolloServer, gql } = require("apollo-server") 와 같음
import fetch from "node-fetch";

let tweets = [
  {
    id: "1",
    text: "first one!",
    userId: "1",
  },
  {
    id: "2",
    text: "second one!",
    userId: "1",
  },
];

let users = [
  // users에 fullNmae이 없어도 fullName이 resolve인 것을 아므로 fullName이 나옴
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
  type User { # Field라고 불림, 아래에 있는 id, firstName, 등등 도 Field
    id: ID! # 기본적으로 자료형은 nullable (null값을 가질 수 있음), 하지만 !가 있으면 null일 때 에러가 뜸. 이는 무조건적으로 필요한 데이터에 붙임으로써 null값을 받는 것을 방지 할 수 있음
    firstName: String!
    lastName: String!
    """
    Is the sum of firstName + lastName as a string
    """
    fullName: String!
  }
  # 설명할 Field 위에 주석을 큰 따옴표 3개로 달아놓으면 해당하는 주석의 description이 됨
  """
  Tweet object represents a resource for a Tweet
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query { # user에게 data를 보냄 (조회)
    allMovies: [Movie!]!
    allUsers: [User!]!
    allTweets: [Tweet!]! # Tweet의 list type (모든 Tweet 불러오기
    tweet(id: ID!): Tweet # Tweet의 id로 원하는 Tweet을 불러옴
    movie(id: String!): Movie
  }
  type Mutation { # user가 보낸 data로 mutate하는 동작을 넣음 (등록/수정/삭제)
    postTweet(text: String!, userId: ID!): Tweet!
    """
    Deletes a Tweet if found, else returns false
    """
    deleteTweet(id: ID!): Boolean!
  }
  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }
`; // graphql은 data의 type를 써야함 (SDL), Query의 type는 의무적으로 써야함

const resolvers = {
  // field 요청이 들어오면 그 field에 대한 값을 반환함
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      // root는 해당 field의 상위 field를 가르킴
      // 유저가 보낸 arguments(Query에 넣은 인수, 여기서는 tweet의 id)는 항상 두번째 argment임
      return tweets.find((tweet) => tweet.id === id); // 유저가 찾고자하는 tweet의 id와 같은 tweet 반환
    },
    allUsers() {
      console.log("allUsers called!");
      return users;
    },
    allMovies() {
      return fetch("https://yts.mx/api/v2/list_movies.json").then((r) =>
        r.json().then((json) => json.data.movies)
      );
    },
    movie(_, {id}) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`).then((r) =>
        r.json().then((json) => json.data.movie)
      );
    }
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      // 유저가 tweet을 올릴 때 사용, root를 _으로도 씀
      const newTweet = {
        // 유저가 만든 새로운 tweet
        id: tweets.length + 1,
        text,
        userId,
      };
      if (!users.find((user) => user.id === userId)) {
        // #4.9 homework
        throw new Error("no id found");
      }
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
    fullName({ firstName, lastName }) {
      // root는 fullName을 가진 user, root를 firstName, lastName으로 쪼갬
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      // tweets에 author가 없으므로 resolver 실행
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
