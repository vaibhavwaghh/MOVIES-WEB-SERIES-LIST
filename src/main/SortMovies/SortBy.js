import AllTabs from "./AllTabs";

function SortBy({ watched, onDeleteWatched }) {
  return (
    <>
      {watched.length > 0 && (
        <AllTabs watched={watched} onDeleteWatched={onDeleteWatched} />
      )}
    </>
  );
}

export default SortBy;
