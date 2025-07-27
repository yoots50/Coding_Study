import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id #remote field(api로 전송되는 field)에 해당됨
      title
      medium_cover_image
      rating
      isLiked @client #local only field(유저의 apollo cache에만 존재하는 field)에 해당됨
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;
const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;
const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 28px;
`;
const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movie() {
  const { id } = useParams(); // id를 받음
  const {
    data,
    loading,
    client: { cache }, // client의 cache를 가져옴
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  }); // GET_MOVIE는 movieId를 필요로 하므로 useQuery의 두번째 인수로 variables를 넣어줌, movieId를 필요로 하므로 variables에 movieId를 써주어야 함

  const onClick = () => {
    cache.writeFragment({ // 특정 타입의 field를 수정함
      id: `Movie:${id}`, // 수정하고 싶은 객체를 설정
      fragment: gql`
        fragment MovieFragment on Movie { # Fragment (원하는 이름) on (GraphQL 타입, 위의 Movie:${id} 부분의 Movie와 이름이 같아야함), 이 안에 바꿀 것들을 써놓아야 함
          isLiked # isLiked를 바꿀 것이므로 여기에 넣음
        }
      `,
      data: {
        isLiked: !data.movie.isLiked, // 어떻게 바꿀 것인지를 적음
      }
    })

  };
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>{data?.movie?.isLiked ? "Unlike" : "Like"}</button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}
