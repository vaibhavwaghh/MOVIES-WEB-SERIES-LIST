import { useState, useEffect } from "react";
export function useLocalStorageState(initalState, key) {
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initalState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  );
  return [watched, setWatched];
}
