import React from "react";
import "./filters.css";
import FilterItem from "./filterItem/FilterItem";

const Filter = ({ filters }) => {
  return (
    <div className={"filters"}>
      {filters &&
        filters.map((filter) => {
          return <FilterItem filter={filter} key={filter.id} />;
        })}
    </div>
  );
};
export default Filter;
