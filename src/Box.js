import { useState, useEffect } from "react";
export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className="box"
        style={{ overflowY: "auto", overflowX: "hidden", fontSize: "2rem" }}
      >
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    </>
  );
}
// function WatchedBox() {
//   const [isOpen1, setIsOpen1] = useState(true);
//   const [movies, setMovies] = useState(tempMovieData);
//   const [watched, setWatched] = useState(tempWatchedData);

//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <>
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {isOpen2 && (
//           <>
//             <WatchedSummary watched={watched} />
//             <WatchedMoviesList watched={watched} />
//           </>
//         )}
//       </div>
//     </>
//   );
// }
