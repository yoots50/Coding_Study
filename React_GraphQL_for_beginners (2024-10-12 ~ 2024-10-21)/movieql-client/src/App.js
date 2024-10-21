import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./routes/Movies";
import Movie from "./routes/Movie"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} /> {/* :id는 useParams으로 전달됨 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
