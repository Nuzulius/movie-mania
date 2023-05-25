import "./App.css";
import { getMlist, searchm } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [popMovies, setPopMovies] = useState([]);

  useEffect(() => {
    getMlist().then((result) => {
      setPopMovies(result);
    });
  }, []);

  const PopMovieList = () => {
    return popMovies.map((movie, i) => {
      return (
        <div className="m-wrapper" key={i}>
          <img
            className="m-image"
            alt="gambar"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="m-title">{movie.title}</div>
          <div className="m-text">
            <span>Release date</span>
            <div className="m-date">{movie.release_date}</div>
            <span>Vote rate</span>
            <div className="m-rate"> {movie.vote_average}</div>
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchm(q);
      setPopMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Mania</h1>
        <div className="box-search">
          <img src="../img/search.svg" alt="search" />
          <input
            className="m-search"
            placeholder="temukan judul film..."
            onChange={({ target }) => search(target.value)}
          />
        </div>
      </header>
      <div className="m-container">
        <PopMovieList />
      </div>
    </div>
  );
}

export default App;
