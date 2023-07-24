import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { useSelector, useDispatch } from 'react-redux'
import { setAdmin, setAuth } from "../redux/slices/authSlice";
import { setInit } from "../redux/slices/appSlice";
import { initActors } from "../storage-config/functions";
import { backendActor } from "../config";

const Header = () => {
  const dispatch = useDispatch()
  const {isAuthenticated, isAdmin} = useSelector((state) => state.auth)

  const login = async () => {
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    } else {
      await authClient.login({
        derivationOrigin: "https://j62gc-2iaaa-aaaal-qbynq-cai.icp0.io",
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          handleAuthenticated(authClient);
        },
      });
    }
  };

  const handleAuthenticated = async (authClient) => {
    const identity = await authClient.getIdentity();
    const principalId = identity.getPrincipal().toString();
    dispatch(setAuth({ val: true }))
    console.log("principalId", principalId);
  };

  const checkAuth = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      dispatch(setAuth({ val: true }))
    }
  }

  const init = async () => {
    const res = await initActors();
    if (res) {
      dispatch(setInit());
    }
  };

  useEffect(() => {
    init();
    checkAuth()
  }, [])

  const logOut = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout()
    dispatch(setAuth({ val: false }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      const checkAuth = async () => {
        console.log("Checking auth")
        const authClient = await AuthClient.create();
        const identity = await authClient.getIdentity();
        const role = await backendActor.my_role(identity.getPrincipal());
        if (role === "unauthorized") {
          dispatch(setAdmin({ val: false }))
        } else {
          dispatch(setAdmin({ val: true }))
        }
        console.log("User role: ", role);
      }
      checkAuth()
    }
  }, [isAuthenticated])


  return (
    <div className="bg-gray-950 text-gray-300 h-[100px] flex justify-between items-center gap-5 pl-5">
      <h1 className="text-2xl font-extrabold">BLOCK-FILES</h1>
      <div className="mr-20 text-xl">
        <Link to="/" className="px-2 py-1.5">
          Gallary
        </Link>
        <Link to="galaxybits" className="px-2 py-1.5">
          GalaxyBits
        </Link>
        <Link to="todo" className="px-2 py-1.5">
          Todo
        </Link>
        {isAuthenticated ? <button onClick={logOut} className="px-2 py-1.5">
          Logout
        </button> : <button onClick={login} className="px-2 py-1.5">
          Login
        </button>}
      </div>
    </div>
  );
};

export default Header;
