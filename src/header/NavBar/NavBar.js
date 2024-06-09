import Search from "./Search";
import Logo from "./Logo";
import NumResults from "./NumResults";
function NavBar({ query, setQuery, movies }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </nav>
    </>
  );
}

export default NavBar;
