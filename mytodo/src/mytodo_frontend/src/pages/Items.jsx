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
import { canisterId, mytodo_backend } from "../../../declarations/mytodo_backend/index";

const Items = () => {
  const [showForm, setShowForm] = useState(false);
  const [initiated, setInit] = useState(false);
  const location = useLocation();
  const [urls, setUrls] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [facts, setFacts] = useState([]);
  const [uploads, setUploads] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selected = files.slice(0, 4);
    setUploads(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urls = await uploadAssets();
      if (urls) {
        setLoading(true)
        const input = {
          id: uuidv4(),
          name: name,
          description: description,
          facts: urls,
        };
        const res = await mytodo_backend.saveFact(input)
        if (res) {
            console.log(res)
            setLoading(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFacts = async () => {
    const res = await mytodo_backend.getFacts();
    if (res.ok) {
      setFacts(res.ok);
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
          setUpLoading(false);
        } catch (error) {
          console.error("Error uploading file:", image.name, error);
        }
      }
      setUrls(assetsUrls);
      console.log("Assets urls here", assetsUrls);
      return assetsUrls;
    }
  };

  const handleDelete = async (url) => {
    deleteAsset(url);
    getFacts();
  };

  console.log(facts, "facts here");

  return (
    <div className="min-h-screen text-gray-800">
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
                className="border border-gray-400 rounded w-full py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-400 rounded w-full py-2 px-3"
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
                loading ? `bg-green-600` : `bg-blue-500`
              }   py-2 px-4 rounded-lg text-white`}
            >
              {uploading && "Uploading..."}
              {loading && "Saving..."}
            </button>
          </form>
        )}
      </div>
      <div className="flex">
        {facts.length == 0 && (
          <h3 className="text-center">
            {loading ? "Loading ..." : "No facts uploaded yet"}
          </h3>
        )}
        {facts?.map((fact) => (
          <div key={fact.id} className="">
            <h3>{fact.name}</h3>
            <h3>{fact.description}</h3>
            {fact.images.map((image, index) => (
                <img key={index} src={image} className="h-[200px] w-[200px]" alt="Image" />
            ))}
            <button className="my-4" onClick={() => handleDelete(image.url)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
