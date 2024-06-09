import NavBar from "./NavBar/NavBar";

function Header({ query, setQuery, movies }) {
  return (
    <>
      <NavBar query={query} setQuery={setQuery} movies={movies} />
    </>
  );
}

export default Header;
