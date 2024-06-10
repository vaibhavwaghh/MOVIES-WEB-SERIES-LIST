import { useEffect, useState } from "react";
const KEY = "694a2c05";
export function useGetSelectedMovieDetails(selectedId) {
  const [movie, setMovie] = useState({});
  const [loading, setIsLoading] = useState(false);
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
  return { movie, loading };
}
