import Movie from "./Movie";
export default function MovieList({ movies, handleSelectedMovie }) {
  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            handleSelectedMovie={handleSelectedMovie}
          />
        ))}
      </ul>
    </>
  );
}
