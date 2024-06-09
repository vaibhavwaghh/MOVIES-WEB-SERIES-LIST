import { useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  /**METHOD 1 --> USING QUERY SELECTOR*/
  // useEffect(function () {
  //   const inputEl = document.querySelector(".search");
  //   inputEl.focus();
  // }, []);

  /**METHOD 2 --> USING USE-REF HOOK  */
  // const inputEl = useRef(null);
  // useEffect(function () {
  //   inputEl.current.focus();
  // }, []);

  /**METHOD 3 --> USING CUSTOM HOOK  WHEN CLICKED ENTER*/
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
}
