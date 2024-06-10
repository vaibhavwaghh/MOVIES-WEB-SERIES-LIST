import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  setCustomerRating: PropTypes.func,
};
const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};
const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  setUserRating,
}) {
  const textStyle = {
    lineHieght: "1",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  function handleRating(val) {
    setRating(val);
    setUserRating(val);
  }
  return (
    <>
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              handleRating={handleRating}
              i={i}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHoverEnter={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              color={color}
              size={size}
            />
          ))}
        </div>
        <p style={textStyle}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      </div>
    </>
  );
}

export default StarRating;
