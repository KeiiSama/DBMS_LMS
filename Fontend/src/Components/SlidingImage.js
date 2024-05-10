import React, { useEffect, useState } from "react";
import "./SlidingImage.css";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";

const FoodImage = [
  {
    url: "https://assets.teenvogue.com/photos/5e6bffbbdee1770008c6d9bd/16:9/w_1920,c_limit/GettyImages-577674005.jpg",
  },

  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHn2-G806Nldmu0tsscXhi2CFjubc5pQI3fxSqwZFUQ&s",
  },

  {
    url: "https://ichef.bbci.co.uk/images/ic/480xn/p03gg1lc.jpg.webp",
  },
];

const SlidingImage = () => {
  const [slider, setSlider] = useState(0);

  const handelNext = () => {
    slider === 2 ? setSlider(0) : setSlider(slider + 1);
  };

  const handleprev = () => {
    slider === 0 ? setSlider(2) : setSlider(slider - 1);
  };

  useEffect(() => {
    let automaticSlide = setInterval(handelNext, 5000);

    return () => {
      clearInterval(automaticSlide);
    };
  }, [slider]);

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center my-2">
          {FoodImage.map((curr, i) => {
            return (
              <div
                key={i}
                className={
                  i === slider
                    ? "col-lg-11 herodiv my-2 p-2"
                    : "col-lg-11 removeImage my-2 p-2"
                }
              >
                <img src={curr.url} className="slideImage" />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-lg-11 overlay d-flex justify-content-center align-items-center">
            <h4 className="text-lg-nowrap text-white">
              Chào mừng bạn đến với Thiên đường văn chương
            </h4>
          </div>
        </div>

        <div className="left-right">
          <GrFormPreviousLink className="nextBtn" onClick={handleprev} />
          <br></br>
          <GrFormNextLink className="prevBtn" onClick={handelNext} />
        </div>
      </div>
    </>
  );
};

export default SlidingImage;
