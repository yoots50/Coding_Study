import Movie from "./components/movie";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&page=1&region=KR"
    )
      .then((response) => response.json())
      .then((json) => {
        setMovie(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <strong>loading</strong>
      ) : (
        <div className="app-container">
          {movie.results.map((item) => {
            return (
              <Movie
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
              />
            );
          })}
        </div>
      )}
      <div></div>
    </div>
  );
}

export default App;
