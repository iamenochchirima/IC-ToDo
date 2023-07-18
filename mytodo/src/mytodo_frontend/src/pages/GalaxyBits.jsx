import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  deleteAsset,
  fetchMediaFiles,
  getAllAssets,
  getFileNameWithoutExtension,
  getVersion,
  initActors,
  uploadFile,
} from "../config/functions";

import { useLocation } from "react-router-dom";
import {
  canisterId,
  mytodo_backend,
} from "../../../declarations/mytodo_backend/index";
import FactCard from "../components/FactCard";

const GalaxyBits = () => {
  const [showForm, setShowForm] = useState(false);
  const [initiated, setInit] = useState(false);
  const location = useLocation();
  // const [urls, setUrls] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);

  const [factId, setFactId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [facts, setFacts] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [imgCount, setImgCount] = useState(null)

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selected = files.slice(0, 4);
    setImgCount(selected.length)
    setUploads(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Runing the submit function");
    try {
      const urls = await uploadAssets();
      console.log("Images saved, urls here", urls);
      setLoading(true);
      if (urls) {
        const input = {
          id: uuidv4(),
          name: name,
          description: description,
          images: urls,
        };
        const res = await mytodo_backend.saveFact(input);
        if (res) {
          console.log(res);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFacts = async () => {
    try {
      const res = await mytodo_backend.getFacts();
      setFacts(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (initiated) {
      getFacts();
      setLoading(false);
    }
  }, [initiated]);

  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const res = await initActors();
      if (res) {
        setInit(true);
      }
    };
    init();
  }, []);

  const uploadAssets = async () => {
    if (initiated && uploads) {
      setUpLoading(true);
      const file_path = location.pathname;
      const assetsUrls = [];

      for (const image of uploads) {
        try {
          const assetUrl = await uploadFile(image, file_path);
          assetsUrls.push(assetUrl);
          console.log("This file was successfully uploaded:", image.name);
          getFacts();
          setImgCount(prevCount => prevCount - 1); 
        } catch (error) {
          console.error("Error uploading file:", image.name, error);
        }
      }
      setUpLoading(false);
      console.log("Assets urls here", assetsUrls);
      return assetsUrls;
    }
  };

  console.log(imgCount)
  

  const handleDelete = async (url) => {
    deleteAsset(url);
    getFacts();
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (factImages, id) => {
    setFactId(id);
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage
      ? factImages.length - 1
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNextImage = (factImages, id) => {
    setFactId(id);
    const isLastImage = currentImageIndex === factImages.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };


  return (
    <div className="min-h-screen text-gray-300">
      <div className="flex flex-col items-center justify-center mt-5">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white p-2  rounded-lg"
        >
          Upload facts
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 text-gray-800 rounded w-full py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-400 text-gray-800 rounded w-full py-2 px-3"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className={`${
                loading || uploading ? `bg-green-600` : `bg-blue-500`
              }   py-2 px-4 rounded-lg text-white`}
            >
              {uploading && `Uploading images... ${imgCount}`}
              {loading && "Saving..."}
              {!uploading && !loading && "Save"}
            </button>
          </form>
        )}
      </div>
      <div className="flex gap-4">
        {facts.length == 0 && (
          <h3 className="text-center">
            {loading ? "Loading ..." : "No facts uploaded yet"}
          </h3>
        )}
        <div className="grid grid-cols-3 gap-3">
          {facts?.map((fact) => (
            <div key={fact.id} className="col-span-1 ">
              <FactCard
                fact={fact}
                id={factId}
                currentImageIndex={currentImageIndex}
                handlePrevImage={handlePrevImage}
                handleNextImage={handleNextImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalaxyBits;
