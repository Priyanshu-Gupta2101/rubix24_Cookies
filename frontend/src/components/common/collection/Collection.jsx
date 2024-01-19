import React from "react";
import "./collection.css";
import Slider from "react-slick";
import NextArrow from "../Carousel/nextArrow";
import PrevArrow from "../Carousel/prevArrow";

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
const Collection = ({ list, text1 }) => {
  return (
    <div className={"collection-wrapper"}>
      <div className={"max-width collection"}>
        <div className={"collection-title"}>Collections</div>
        <div className={"collection-subtitle-row"}>
          <div className={"collection-subtitle-text"}>{text1}</div>
          <div className={"collection-location"}></div>
        </div>
        <Slider {...settings}>
          {list.map((item) => (
            <div>
              <div className={"collection-cover"}>
                <img
                  src={item.cover}
                  className={"collection-image"}
                  alt={item.title}
                />
                <div className={"gradient-bg"}></div>
                <div className="collection-card-title">{item.title}</div>
                <div className={"collection-card-subtitle"}>
                  <div>{item.item}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Collection;
