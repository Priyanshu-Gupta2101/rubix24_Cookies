import React from "react";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        padding: "6px",
        // margin: "20px",
        display: "flex",
        background: "white",
      }}
      onClick={onClick}
    ></div>
  );
}

export default NextArrow;
