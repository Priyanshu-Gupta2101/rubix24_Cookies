import React from "react";
import "./food.css";
import ExploreSection from "../common/exploreSection/ExploreSection";
import { nightlife } from "../../data/nightlife";
import Collections from "../common/collection/Collection";
//
const nightLifeList = nightlife;

const collectionList = [
  {
    id: 1,
    title: "Sea View Dining",
    cover: "https://staybloom.com/content/1686734957579-Mobile.jpg",
  },
];

function Food(props) {
  return (
    <div>
      <Collections
        list={collectionList}
        text1="Mumbai is known for it's Buzzing Nightlife"
      />
      <ExploreSection
        list={nightLifeList}
        collectionName="NightLife in Mumbai"
      />
    </div>
  );
}

export default Food;
