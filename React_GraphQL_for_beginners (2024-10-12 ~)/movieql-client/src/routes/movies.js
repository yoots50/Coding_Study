import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES); // 선언형 코드
  if (loading) {
    // loading중이면 로딩화면 보내기
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1> Could not fetch :(</h1>;
  }
  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map((movie) => (
        <li key={movie.id}><Link to={`/movies/${movie.id}`}>
        {movie.title}
        </Link></li>
      ))}
    </ul>
  );
}
