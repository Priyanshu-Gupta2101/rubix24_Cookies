import React from "react";
import Collection from "../common/collection/Collection";

const collectionList = [
  {
    id: 1,
    title: "Explore Purses in Colaba",
    cover:
      "https://www.pinkvilla.com/english/images/2022/09/111404478_market-2691177_1920_1600*900.jpg",
    item: "Just About Anything",
  },
  {
    id: 2,
    title: "Zaveri Bazaar",
    cover:
      "https://img-cdn.thepublive.com/fit-in/1200x675/local-samosal/media/post_banners/bansAWL9fvLKkU5Xe2ep.jpeg",
    item: "Jewellery",
  },
  {
    id: 3,
    title: "Mr.Souvenyirs",
    cover: "https://im.whatshot.in/img/2018/May/3-1527259289.jpg",
    item: "Trinkets",
  },
  {
    id: 4,
    title: "Candies",
    item: "Stationary",
    cover:
      "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/7/2017/03/18114018/180317_Candies01.jpg",
  },
  {
    id: 5,
    title: "Lalbaug Market",
    item: "Spices",
    cover:
      "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/7/2017/02/07154944/07022016_SpiceMarket_AD_026.jpg",
  },
  {
    id: 1,
    title: "Explore Purses in Colaba",
    cover:
      "https://www.pinkvilla.com/english/images/2022/09/111404478_market-2691177_1920_1600*900.jpg",
  },
  {
    id: 1,
    title: "Explore Purses in Colaba",
    cover:
      "https://www.pinkvilla.com/english/images/2022/09/111404478_market-2691177_1920_1600*900.jpg",
  },
  {
    id: 1,
    title: "Explore Purses in Colaba",
    cover:
      "https://www.pinkvilla.com/english/images/2022/09/111404478_market-2691177_1920_1600*900.jpg",
  },
];

function Memorabilia(props) {
  return (
    <div>
      <Collection
        list={collectionList}
        text1="Here's Some Fun Places to buy Souvenirs and Build Memories!"
      />
    </div>
  );
}

export default Memorabilia;
