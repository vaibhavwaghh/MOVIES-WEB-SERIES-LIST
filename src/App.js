import { useState } from "react";

import Header from "./header/Header";
import Main from "./main/Main";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useGetAllMovies } from "./hooks/useGetAllMovies";

export default function App() {
  /**USING CUSTOMIZED HOOK(HOOK CREATED BY ME) */
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const [query, setQuery] = useState("");
  const { movies, isloading, error } = useGetAllMovies(query);

  const [selectedId, setSelectedId] = useState("");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
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
