import React, { useState } from "react";
import Navbar from "../components/Navbar";

const ComparePg = () => {
  const list = [
    {
      name: "Ashok Vada Pav Center",
      price: 20,
      upvotes: 85,
      reviewWithHighestUpvote: "Tastes like heaven..!!!",
    },
    {
      name: "Aaram Vada Pav",
      price: 15,
      upvotes: 40,
      reviewWithHighestUpvote: "Always served fresh and hot!!",
    },
    {
      name: "Samartha Vada Pav",
      price: 15,
      upvotes: 23,
      reviewWithHighestUpvote: "Probably the best vada pav I have ever had!!",
    },
    {
      name: "Mangesh Vada Pav",
      price: 10,
      upvotes: 13,
      reviewWithHighestUpvote: "Too good.",
    },
  ];

  const [sortBy, setSortBy] = useState(null);

  const handleSort = (type) => {
    setSortBy(type);
  };

  const sortedList = () => {
    if (sortBy === "priceLowToHigh") {
      return [...list].sort((a, b) =>
        typeof a.price === "number" ? a.price - b.price : 0
      );
    } else if (sortBy === "priceHighToLow") {
      return [...list].sort((a, b) =>
        typeof a.price === "number" ? b.price - a.price : 0
      );
    } else if (sortBy === "upvotes") {
      return [...list].sort((a, b) => b.upvotes - a.upvotes);
    }
    return list;
  };

  return (
    <>
      <Navbar />
      <div className="mx-10 mt-20">
        <div className="mb-4 flex items-center place-content-center">
          <h1>Search for "vada pav"</h1>
        </div>
        <div className="mb-4 flex items-center place-content-center">
          <label className="mr-2 text-2xl font-semibold">Sort By:</label>
          <button
            className="font-semibold border-2 border-amber-400 py-1 px-3 rounded hover:bg-amber-400 hover:text-pink-600 duration-500"
            onClick={() => handleSort("priceLowToHigh")}
          >
            Price - Low to High
          </button>
          <button
            className="font-semibold border-2 border-amber-400 py-1 px-3 ml-2 rounded hover:bg-amber-400 hover:text-pink-600 duration-500"
            onClick={() => handleSort("priceHighToLow")}
          >
            Price - High to Low
          </button>
          <button
            className="font-semibold border-2 border-amber-400 py-1 px-3 ml-2 rounded hover:bg-amber-400 hover:text-pink-600 duration-500"
            onClick={() => handleSort("upvotes")}
          >
            Upvotes
          </button>
        </div>
        {sortedList().map((item, index) => (
          <div
            key={index}
            className="border-2 border-pink-600 border-dashed rounded-lg p-4 mb-4 flex hover:bg-amber-50 duration-500"
          >
            <div className="w-2/3">
              <h3 className="text-2xl font-bold">{item.name}</h3>
              <p>
                <ion-icon name="pricetag-outline"></ion-icon>
                Price: Rs. {item.price}
              </p>
              <p>
                <ion-icon name="thumbs-up"></ion-icon>
                Upvotes: {item.upvotes}
              </p>
              <div className="flex space-x-3">
                <button className=" text-amber-400 font-semibold border-2 border-amber-400 py-1 px-3 mt-2 rounded hover:bg-amber-400 hover:text-pink-600 duration-500 flex items-center uppercase">
                  Check out
                </button>
                <button className=" text-amber-400 font-semibold border-2 border-amber-400 py-1 px-3 mt-2 rounded hover:bg-amber-400 hover:text-pink-600 duration-500 flex items-center uppercase">
                  Review Me
                </button>
              </div>
            </div>
            <div className="w-1/3 text-right">
              <p className="text-xl font-medium italic border-l-4 border-blue-500 pl-4">
                "{item.reviewWithHighestUpvote}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ComparePg;
