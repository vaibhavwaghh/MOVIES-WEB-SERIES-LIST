import { useState } from "react";

import Header from "./header/Header";
import Main from "./main/Main";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useMovies } from "./hooks/useMovies";

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
      <Header query={query} setQuery={setQuery} movies={movies} />
      <Main
        isloading={isloading}
        error={error}
        movies={movies}
        handleAddWatched={handleAddWatched}
        handleCloseMovie={handleCloseMovie}
        handleDeleteWatched={handleDeleteWatched}
        handleSelectedMovie={handleSelectedMovie}
        watched={watched}
        selectedId={selectedId}
      />
    </>
  );
}
