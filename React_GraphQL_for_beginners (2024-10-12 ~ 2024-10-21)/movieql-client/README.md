# 📖 React GraphQL for beginners
노마드 코더(NomadCoders)의 강의 (https://nomadcoders.co/react-graphql-for-beginners) 기반으로 GraphQL, React를 배움

## #0.0 ~ #0.3
이 강의를 시작하기위해 설치해야 할 것들과 기본적인 라우트 설정을 배움

## #1.0 ~ #1.4
- ApolloProvide: 애플리케이션 안의 모두가 Apollo client에 접근 가능하도록 client를 제공하는 역할을 함
- useQuery: GraphQL 요청을 하면 data, client, loading, 등등을 받을 수 있음
- 선언형 코드: declarative code, 원하는 걸 설명하기 위한 코드만을 적는 것
- 명령형 코드: imperative code, 모든 단계의 코드를 적은 것
- Apollo cache: Apollo 쿼리의 결과가 유저의 브라우저에 저장이 되게함, 따라서 쿼리를 한번 쓰면 데이터를 다시 불러오지 않음, 같은 type, 같은 id 객체의 추가적인 데이터를 요청하면 새로운 데이터를 같은 cache에 넣음

## #2.0 ~ #2.3
- Local only field: Remote field의 반대로, Apollo cache에서만 활동하는 field를 뜻함
- writeFragment: 특정 객체의 데이터를 수정할 수 있게 함, 하지만 이는 Apollo cache 안에서만 이루어지는 것이기에 GraphQL서버에 반영되지 않음