import React from "react";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        display: "flex",
        background: "white",
      }}
      onClick={onClick}
    ></div>
  );
}

export default PrevArrow;
