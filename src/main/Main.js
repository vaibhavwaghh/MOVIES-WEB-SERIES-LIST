import Box from "./Box";
import MovieDetails from "../main/SearchedMovies/MovieDetails";
import MovieList from "../main/SearchedMovies/MovieList";
import SortBy from "./SortMovies/SortBy";
import WatchedSummary from "./WatchedMovies/WatchedSummary";
import Loader from "../Helpers/Loader";
import ErrorMessage from "../Helpers/ErrorMessage";

function Main({
  isloading,
  error,
  movies,
  handleAddWatched,
  handleCloseMovie,
  handleDeleteWatched,
  handleSelectedMovie,
  watched,
  selectedId,
}) {
  return (
    <main className="main">
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
            <br />
            <SortBy watched={watched} onDeleteWatched={handleDeleteWatched} />
          </>
        )}
      </Box>
    </main>
  );
}

export default Main;
