# 📖 GraphQL for Beginners 
노마드 코더(NomadCoders)의 강의 (https://nomadcoders.co/graphql-for-beginners) 기반으로 GraphQL을 배움<br>
📖 표시 된 것은 직접 만는 부분

## #1.0 ~ #1.2
이 강의를 시작하기 전에 필요한 것들에 대해 배움

## #2.0 ~ #2.3
- API: Application Programming Interface, 프로그램이 소통하는 방법으로 어플리케이션과 상호작용을 가능하게 해줌
- Rest API: 특정 URL을 통해 정보를 받음, REST API의 URL은 폴더와 같이 어떤 항목안에 다른 항목들이 존재하며 (ex: /2/tweets/counts/recent 여기서 recent는 endpoint로 Rest API는 이러한 endpoint들이 여러개 존재함)은 파라미터를 가짐. (xxx.com/api/movies?rating=9는 평점이 9인 영화 목록에 대한 API이고 파라미터는 rating=9임) 주로 HTTP 메소드 + URL 형식으로 쓰임
- HTTP 메소드: 서버로 부터 데이터를 요청하거나 서버에 응답하는 방식, 메소드는 총 8가지가 있음
1. GET: 서버로부터 데이터를 받을 때 씀
2. POST: 서버에서 데이터를 보낼 때 씀
3. PUT: 서버로 데이터를 보낼 때 씀
4. DELETE: 서버의 데이터를 삭제할 때 씀
이러한 메소드 앞의 URL은 같을 수 있어도 하는 일은 다름

## #3.0 ~ #3.3
- GraphQL: Facebook에서 개발된 오픈소스, REST API가 가진 문제를 해결함, Rest API가 특정 URL로 정보를 주고 받는 것과는 다르게 쿼리 언어를 이용하며 하나의 endpoint를 갖고 한번의 요청으로 원하는 데이터를 받을 수 있음
- REST API의 문제점:
1. Overfetching: 자신이 쓰고싶은 데이터 외의 데이터를 받는 것, 데이터를 많이 받음으로써 DB와 Backend의 일을 증가시키고 데이터 전송이 느려질 수 있음
2. Underfetching: 자신이 쓰고싶은 데이터보다 덜 받는 것, 여러 Request 요청을 함으로써 데이터 전송이 느려질 수 있음

## #4.0 ~ #
- Apollo Server: GraphqQL와 호환되는 오픈소스 서버
- ApolloServer(): Apollo 서버를 만드는 함수로 typeDefs를 필요로 함
- TypeDefs: Data들의 Type를 담은 것으로 무조건 Query 메소드를 필요로 함
- Query: 유저에게 주는 Data를 담은 메소드로 유저가 데이터를 조회 할 수 있게함
- Mutation: 유저가 서버로 줄 수 있는 Data를 담은 메소드로 유저가 데이터를 등록/수정/삭제 할 수 있게함
- Resolver: 요구받은 field에 해당하는 data를 반환하는 함수를 담음
- 📖 postTweet 실행 시 userId가 users에 해당하는지 검사하는 코드 작성
- Rest API를 GraphQL로 감싸는 것이 가능함
