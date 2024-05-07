/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaHeart} from "react-icons/fa"

import { FaAngleRight, FaAngleLeft  } from "react-icons/fa6";
import Card from "./Card";

const SampleNextArrow = (props) => {
   // console.log(props);
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);
   const fetchdata= async()=>{
     const response= await fetch("https://foodi-backend-1.onrender.com/api/v1/menu")
     const json =  await response.json()
      // console.log(json)
         const specials= json?.data?.filter((item)=>item.category === "popular")
      setRecipes(specials)
   }
  useEffect(() => {
    fetchdata()
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative">
       <div className='text-left'>
            <p className='text-red-500 uppercase tracking-wide font-semibold text-lg'>Customer Favorites</p>
            <h2 className='text-4xl md:text-5xl md:leading-snug font-bold my-2'>Popular Catagories</h2>
        </div>
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button onClick={() => slider?.current?.slickPrev()}
        className=" btn p-2 rounded-full ml-5"
        >
        <FaAngleLeft className=" h-8 w-8 p-1"/>
        </button>
        <button
          className="bg-green btn p-2 rounded-full ml-5"
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className=" h-8 w-8 p-1"/>
        </button>
      </div>

      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {recipes.map((item, i) => (
          <Card item={item} key={i}/>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;