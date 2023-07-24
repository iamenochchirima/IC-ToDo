import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { deleteAsset } from "../storage-config/functions";
import { backendActor } from "../config";

const FactCard = ({
  fact,
  factId,
  setDeleted,
  isAdmin,
  currentImageIndex,
  handlePrevImage,
  handleNextImage,
}) => {
  const [index, setIndex] = useState(0);

  const deleteAssetUrls = async (urls) => {
    for (const url of urls) {
      console.log("Deleting this url", url)
      await deleteAsset(url);
    }
  };

  const handleDelete = async (factId, urls) => {
    await backendActor.deleteFact(factId);
    deleteAssetUrls(urls)
    setDeleted(true)
  };

  useEffect(() => {
    if (factId === fact.id) {
      setIndex(currentImageIndex);
    }
  }, [factId, currentImageIndex]);

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
      {isAdmin && <button onClick={() => handleDelete(fact.id, fact.images)} className="p-2 bg-blue-500 rounded-lg text-white">Delete</button>}
      <h3>{fact.name}</h3>
      <h3>{fact.description}</h3>
    </>
  );
};

export default FactCard;
