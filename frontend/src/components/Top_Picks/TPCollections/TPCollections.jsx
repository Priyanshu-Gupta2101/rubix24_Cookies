import React from "react";
import "./TPCollections.css";
import Slider from "react-slick";
import NextArrow from "../../common/Carousel/nextArrow";
import PrevArrow from "../../common/Carousel/prevArrow";
import TPItem from "./TPItem/TPItem";
import { useNavigate } from "react-router-dom";
import MovingText from "../../MovingText/MovingText";

const tpItems = [
  {
    id: 1,
    title: "Vada Pav",
    cover:
      "https://static.toiimg.com/thumb/80920657.cms?imgsize=251331&width=800&height=800",
    url: "compare",
  },
  {
    id: 2,
    title: "Falooda",
    cover:
      "https://www.spiceupthecurry.com/wp-content/uploads/2013/05/falooda-recipe-1.jpg",
  },
  {
    id: 3,
    title: "Elephanta Caves Tour",
    cover:
      "https://www.tripsavvy.com/thmb/fdxJA_nFNkK77yxMVUudyMPSqIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mumbai2019-1-34-b97e159b015d4c989fa265b4b3ac7463.JPG",
    url: "elephanta",
  },
  {
    id: 4,
    title: "Gateway of India",
    cover:
      "https://imaginoso.com/files/india/mumbai/2301-gateway-india-northwest-elevation-1998.jpg",
  },
  {
    id: 9,
    title: "Colaba Causeway",
    cover: "https://yometro.com/images/places/colaba-causeway.jpg",
  },
  {
    id: 5,
    title: "Kebabs",
    cover:
      "https://www.foodandwine.com/thmb/Md6oUDBPq7MGWAfYLG6XDwz9L-U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steak_chorizo_potato_kabobs_ft_060-2000-e4f0292c3cd8445aa917d8e557869729.jpg",
  },
  {
    id: 7,
    title: "Haji Ali Dargah",
    cover:
      "https://i0.wp.com/mumbai7.com/wp-content/uploads/2021/07/DSCN2925-scaled.jpg",
  },
  {
    id: 8,
    title: "Siddhivinayak Temple",
    cover:
      "https://images.herzindagi.info/webstories/5812/1673258850-cover.jpg",
  },
];

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

function TpCollections(props) {
  let navigate = useNavigate();
  return (
    <div className={"tp-collection"}>
      <div className={"max-width"}>
        <MovingText />
        <div className={"collection-title"}>The Absolute Essentials</div>
        <Slider {...settings}>
          {tpItems.map((item) => {
            return <TPItem item={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
}

export default TpCollections;
