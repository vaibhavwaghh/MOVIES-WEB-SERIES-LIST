import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

function Test() {
  const [customerRating, setCustomerRating] = useState(0);
  return (
    <>
      <StarRating color="blue" setCustomerRating={setCustomerRating} />
      <p>Customer rating is {customerRating}</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={"ddsf"} />
    <StarRating maxRating={5} size={24} color={"red"} className="test" />
    <StarRating
      maxRating={5}
      messages={["terrible", "bad", "Okay", "Good", "Amazing"]}
      defaultRating={2}
    />
    <Test />
  </React.StrictMode>
);
