import { useState } from "react";
import Tab from "./Tab";
import WatchedMoviesList from "../WatchedMovies/WatchedMoviesList";

function AllTabs({ watched, onDeleteWatched }) {
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
    </div>
  );
}

export default AllTabs;
