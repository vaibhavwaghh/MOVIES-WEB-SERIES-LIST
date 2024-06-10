import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import Loader from "../../Helpers/Loader";
import { useKey } from "../../hooks/useKey";
import { useGetSelectedMovieDetails } from "../../hooks/useGetSelectedMovieDetails";

export default function MovieDetails({
  selectedId,
  handleCloseMovie,
  onAddWatched,
  watched,
}) {
  /**1) GET RELEVANT DATA OF SELECTED MOVIE*/
  const { movie, loading } = useGetSelectedMovieDetails(selectedId);

  /**2) CJECK WHETHER MOVIE IS ALREADY IN MY WATCHLIST */
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  /**3) CLOSE THE MOVIE DETAILS WHEN ESCAPE IS CLICKED */
  useKey("Escape", handleCloseMovie);

  /**4) GIVE USER RATINGS TO THE CURRENT MOVIE SELECTED */
  const [userRating, setUserRating] = useState("");

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  function handleAdd() {
    if (userRating === "") alert("Please Rate this movie");
    else {
      const newWatchedMovie = {
        imdbID: selectedId,
        Title,
        Year,
        Poster,
        imdbRating: Number(imdbRating),
        Runtime: Runtime.split(" ")[0],
        timestamp: Date.now(),
        userRating,
      };
      onAddWatched(newWatchedMovie);
      handleCloseMovie();
    }
  }

  return (
    <div className="selected">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header style={{ position: "relative" }}>
            <img src={Poster} alt={`Poster of ${Title}`} className="mov-img" />
            <button class="back-btn" onClick={handleCloseMovie}>
              &#8592;
            </button>
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull;{Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    color={"yellow"}
                    className="test"
                    setUserRating={setUserRating}
                  />
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to List
                  </button>
                </>
              ) : (
                <p>You have already rated this movie {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed By {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
