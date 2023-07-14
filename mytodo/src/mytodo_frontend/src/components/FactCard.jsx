import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const FactCard = ({
  fact,
  id,
  currentImageIndex,
  handlePrevImage,
  handleNextImage,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (id === fact.id) {
      setIndex(currentImageIndex);
    }
  }, [id, currentImageIndex]);

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  return (
    <>
      <div className="w-[400px] h-[300px] relative group">
        <div
          style={{
            backgroundImage: `url(${fact.images[index]})`,
          }}
          className="w-full h-full rounded-2xl  bg-center bg-cover duration-500"
        ></div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft
            onClick={() => handlePrevImage(fact.images, fact.id)}
            size={30}
          />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight
            onClick={() => handleNextImage(fact.images, fact.id)}
            size={30}
          />
        </div>
      </div>
      <div className="flex top-4 justify-center py-2">
        {fact.images.map((image, imageIndex) => (
          <div
            key={imageIndex}
            className={` ${
              imageIndex === index ? `text-blue-500` : ``
            } text-2xl cursor-pointer`}
          >
            <RxDotFilled onClick={() => goToSlide(imageIndex)} />
          </div>
        ))}
      </div>
      <h3>{fact.name}</h3>
      <h3>{fact.description}</h3>
    </>
  );
};

export default FactCard;
