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
import { AuthClient } from "@dfinity/auth-client";

import { useLocation } from "react-router-dom";
import {
  canisterId,
  mytodo_backend,
} from "../../../declarations/mytodo_backend/index";

const Gallary = () => {
  const [authorized, setAuthorized] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [initiated, setInit] = useState(false);
  const location = useLocation();
  const [urls, setUrls] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [uploads, setUploads] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selected = files.slice(0, 4);
    setUploads(selected);
  };

  const getImages = async () => {
    const res = await getAllAssets();
    if (res.ok) {
      setImages(res.ok);
    }
  };

  const checkAuth = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      const identity = await authClient.getIdentity();
      const userPrincipal = identity.getPrincipal().toString();
      console.log(userPrincipal);
      try {
        const role = await mytodo_backend.my_role(identity.getPrincipal());
        if (role === "unauthorized") {
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
        console.log("User role: ", role);
      } catch (error) {
        setAuthorized(false);
        console.log(error);
      }
    } else {
      console.log("Your'e not logged in");
    }
  };
  useEffect(() => {
    if (initiated) {
      getImages();
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
    checkAuth();
  }, []);

  const uploadAssets = async (e) => {
    e.preventDefault();
    if (initiated && uploads) {
      setUpLoading(true);
      setLoading(true);
      const file_path = location.pathname;
      const assetsUrls = [];

      for (const image of uploads) {
        try {
          const assetUrl = await uploadFile(image, file_path);
          assetsUrls.push(assetUrl);
          console.log("This file was successfully uploaded:", image.name);
          getImages();
          setUpLoading(false);
        } catch (error) {
          console.error("Error uploading file:", image.name, error);
        }
      }
      setUrls(assetsUrls);
      setLoading(false);
      console.log("Assets urls here", assetsUrls);
    }
  };

  const handleDelete = async (url) => {
    deleteAsset(url);
    getImages();
  };

  console.log(images, "images here");
  console.log(authorized)

  return (
    <div className="min-h-screen text-gray-800 px-5">
      <div className="flex flex-col items-center justify-center mt-5">
        {authorized && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 p-2 text-white rounded-lg"
          >
            Upload images
          </button>
        )}
        {showForm && (
          <form onSubmit={uploadAssets} className="mt-5">
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
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        )}
      </div>
      <div>
        {images.length == 0 && (
          <h3 className="text-center">
            {loading ? "Loading ..." : "No images uploaded yet"}
          </h3>
        )}
        <div className="grid grid-cols-3 gap-3">
          {images?.map((image) => (
            <div key={image.id} className="col-span-1">
              <img src={image.url} className="" alt="Image" />
              {authorized && (
                <button
                  className="my-4"
                  onClick={() => handleDelete(image.url)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallary;
