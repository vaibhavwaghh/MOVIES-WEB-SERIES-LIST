import { useState } from "react";
import WatchedMoviesList from "./WatchedMoviesList";

function SortBy({ watched, onDeleteWatched }) {
  return (
    <>
      {watched.length > 0 && (
        <Tabbed watched={watched} onDeleteWatched={onDeleteWatched} />
      )}
    </>
  );
}

export default SortBy;

// const content = [
//   {
//     summary: "React is a library for building UIs",
//     details:
//       "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
//   {
//     summary: "State management is like giving state a home",
//     details:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
//   {
//     summary: "We can think of props as the component API",
//     details:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
// ];

// console.log(<DifferentContent text="vaibhav" />);
// console.log(DifferentContent());
function Tabbed({ watched, onDeleteWatched }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className="tabs">
        <Tab
          name="Latest"
          num={1}
          activeTab={activeTab}
          onClick={(val) => setActiveTab(val)}
        />
        <Tab
          name="User-Rating"
          num={2}
          activeTab={activeTab}
          onClick={(val) => setActiveTab(val)}
        />
        <Tab
          name="Watch-Time"
          num={3}
          activeTab={activeTab}
          onClick={(val) => setActiveTab(val)}
        />
        <Tab
          name="Year"
          num={4}
          activeTab={activeTab}
          onClick={(val) => setActiveTab(val)}
        />
      </div>
      <WatchedMoviesList
        watched={watched}
        activeTab={activeTab}
        onDeleteWatched={onDeleteWatched}
      />
      {/* {activeTab <= 3 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
      {TabContent({ item: content.at(0) })} */}
    </div>
  );
}

function Tab({ name, num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      {name}
    </button>
  );
}

// function TabContent({ item }) {
//   console.log("RENDERED");
//   const [showDetails, setShowDetails] = useState(true);
//   const [likes, setLikes] = useState(0);

//   function handleInc() {
//     setLikes(likes + 1);
//   }
//   function handleTripleInc() {
//     setLikes((likes) => likes + 1);
//     setLikes((likes) => likes + 1);
//     setLikes((likes) => likes + 1);
//   }
//   function handleUndo() {
//     setShowDetails(true);
//     setLikes(0);
//     console.log(likes);
//   }
//   function handleUndoLater() {
//     setTimeout(handleUndo, 2000);
//   }

//   return (
//     <div className="tab-content">
//       <h4>{item.summary}</h4>
//       {showDetails && <p>{item.details}</p>}

//       <div className="tab-actions">
//         <button onClick={() => setShowDetails((h) => !h)}>
//           {showDetails ? "Hide" : "Show"} details
//         </button>

//         <div className="hearts-counter">
//           <span>{likes} ❤️</span>
//           <button onClick={handleInc}>+</button>
//           <button onClick={handleTripleInc}>+++</button>
//         </div>
//       </div>

//       <div className="tab-undo">
//         <button onClick={handleUndo}>Undo</button>
//         <button onClick={handleUndoLater}>Undo in 2s</button>
//       </div>
//     </div>
//   );
// }

// function DifferentContent() {
//   return (
//     <div className="tab-content">
//       <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
//     </div>
//   );
// }
