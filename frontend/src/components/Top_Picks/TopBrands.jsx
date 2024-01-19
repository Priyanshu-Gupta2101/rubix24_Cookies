import React from "react";
import "./top_brands.css";
import NextArrow from "../common/Carousel/nextArrow";
import PrevArrow from "../common/Carousel/prevArrow";
import Slider from "react-slick";

const brandsList = [
  {
    id: 1,
    score: 255,
    cover:
      "https://scontent.fbom61-1.fna.fbcdn.net/v/t39.30808-6/326257196_854214545883193_3109435501158374473_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=h6Lx43XU_2sAX_cmpAj&_nc_ht=scontent.fbom61-1.fna&oh=00_AfDW2j-y-VTvS6FcgJTZG_gRbG7DSGFNY0q0DzmbSRXTxQ&oe=65AEDC25",
  },
  {
    id: 2,
    score: 293,
    cover:
      "https://ugc.production.linktr.ee/yv850uQkSZmv4yQgS02P_Screen%20Shot%202022-06-19%20at%2010.19.27%20AM.png?io=true&size=thumbnail-stack-v1_0",
  },
  {
    id: 3,
    score: 876,
    cover:
      "https://content.jdmagicbox.com/comp/pune/l7/020pxx20.xx20.210618062102.t7l7/catalogue/theobroma-mundhwa-pune-cake-shops-pwzx9zcdgz-250.jpg",
  },
  {
    id: 4,
    score: 921,
    cover:
      "https://logowik.com/content/uploads/images/van-heusen2487.logowik.com.webp",
  },
  {
    id: 5,
    score: 544,
    cover:
      "https://lh3.googleusercontent.com/5dBq_0mdbYPmHp-rX5VBFF7cXI7bYIFtuqscadzR0mV5w1eEf4BlUg2Swtl0JEaEIxf_Nv-KvjvLV9BSrUl5AFKJX6Szcg56UhMb50bT",
  },
  {
    id: 6,
    score: 433,
    cover:
      "data:image/png;base64,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",
  },
];

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
const TopBrands = () => {
  return (
    <div className="top-brands max-width">
      <div className="collection-title">Top Brands in Mumbai</div>
      <Slider {...settings}>
        {brandsList.map((brand) => {
          return (
            <div>
              <div className="top-brands-cover">
                <img
                  src={brand.cover}
                  className={"top-brands-imagr"}
                  alt={brand.title}
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default TopBrands;
