import WatchedMovie from "./WatchedMovie";
export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
  activeTab,
}) {
  let sortedWatchedMovies;
  if (activeTab === 1) {
    sortedWatchedMovies = watched.sort((a, b) => b.timestamp - a.timestamp);
  } else if (activeTab === 2) {
    sortedWatchedMovies = watched.sort((a, b) => b.userRating - a.userRating);
  } else if (activeTab === 3) {
    sortedWatchedMovies = watched.sort((a, b) => a.Runtime - b.Runtime);
  } else if (activeTab === 4) {
    sortedWatchedMovies = watched.sort((a, b) => a.Year - b.Year);
  }
  return (
    <>
      <ul className="list">
        {sortedWatchedMovies.map((movie) => (
          <WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched} />
        ))}
      </ul>
    </>
  );
}
