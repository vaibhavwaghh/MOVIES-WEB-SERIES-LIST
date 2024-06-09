import logo from "../../images/popcorn.png";
export default function Logo() {
  return (
    <>
      <div className="logo">
        <img style={{ width: "3.5rem" }} src={logo} alt="" />
        <h1>Popcorn Movies</h1>
      </div>
    </>
  );
}
