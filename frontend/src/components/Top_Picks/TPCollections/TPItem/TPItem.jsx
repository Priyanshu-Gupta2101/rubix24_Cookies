import React from "react";
import "./tp_item.css";
import { useNavigate } from "react-router-dom";
const TpItem = ({ item }) => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="tp-item-cover">
        <img
          src={item.cover}
          className="tp-item-image"
          alt={item.title}
          onClick={() => navigate(`/${item.url}`)}
        />
      </div>
      <div className={"tp-item-title"}>{item.title}</div>
    </div>
  );
};

export default TpItem;
