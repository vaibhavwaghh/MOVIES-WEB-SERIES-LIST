import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import Box from "./Box";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import WatchedMovie from "./WatchedMovie";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];
const KEY = "694a2c05";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  /**METHOD 1 : USESTATE */
  //  const [watched, setWatched] = useState("")
  /**METHOD 2 : USESTATE HOOK */
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });
  /**METHOD 3 : USING CUSTOMIZED HOOK(HOOK CREATED BY ME) */
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isloading, error } = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <nav className="nav-bar">
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
        </nav>
      </NavBar>
      <Main>
        {/* <Box>{isloading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (
            <MovieList
              handleSelectedMovie={handleSelectedMovie}
              movies={movies}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function Loader() {
  return <p className="loader">Loading... </p>;
}

export function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

export function NavBar({ children }) {
  return <>{children}</>;
}

export function Logo() {
  return (
    <>
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    </>
  );
}

export function NumResults({ movies }) {
  return (
    <>
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </>
  );
}
export function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}
export function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  /**METHOD 1 --> USING QUERY SELECTOR*/
  // useEffect(function () {
  //   const inputEl = document.querySelector(".search");
  //   inputEl.focus();
  // }, []);

  /**METHOD 2 --> USING USE-REF HOOK  */
  // const inputEl = useRef(null);
  // useEffect(function () {
  //   inputEl.current.focus();
  // }, []);

  /**METHOD 3 --> USING CUSTOM HOOK  WHEN CLICKED ENTER*/
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
}
/**EXPERIMENTS ON USE-EFFECT HOOK */
// useEffect(function () {
//   console.log("EMPTY DEPENDENCY ARRAY(INITIAL)");
// }, []);
// useEffect(function () {
//   console.log("NO DEPENDENCY ARRAY");
// });
// useEffect(
//   function () {
//     console.log("SOME QUERY");
//   },
//   [query]
// );
// console.log("COMPONENT RE-RENDERED");
