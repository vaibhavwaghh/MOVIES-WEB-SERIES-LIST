import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { Loader } from "./App";
import { useKey } from "./useKey";
const KEY = "694a2c05";
export default function MovieDetails({
  selectedId,
  handleCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  console.log(watchedUserRating);
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
  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );
  useKey("Escape", handleCloseMovie);
  // useEffect(
  //   function () {
  //     function callBack(e) {
  //       if (e.code === "Escape") {
  //         handleCloseMovie();
  //         console.log("ESCAPE ");
  //       }
  //     }

  //     document.addEventListener("keydown", callBack);
  //     return function () {
  //       document.removeEventListener("keydown", callBack);
  //     };
  //   },
  //   [handleCloseMovie]
  // );
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!Title) return;
      document.title = `Movie : ${Title}`;
      return function () {
        document.title = "Use Popcorn";
      };
    },
    [Title]
  );
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Runtime.split(" ")[0],
      timestamp: Date.now(),
      userRating,
      countRatingDecision: countRef.current,
    };
    console.log("THIS IS NEW WATCHED MOVIE", newWatchedMovie);
    onAddWatched(newWatchedMovie);
    handleCloseMovie();
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
                    setCustomerRating={setUserRating}
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
