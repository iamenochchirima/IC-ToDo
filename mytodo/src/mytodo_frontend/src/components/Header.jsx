import React, { useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Link } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";

const Header = () => {
  // const agent = new HttpAgent({
  //   host: "http://127.0.0.1:4943",
  // });

  // const canisterId = "qaa6y-5yaaa-aaaaa-aaafa-cai";

  // const myActor = Actor.createActor(canisterId, {
  //   agent,
  //   canisterId,
  // });

  // useEffect(() => {
  //   async function runThis() {
  //     const result = await myActor.getAllProducts();
  //     console.log(result);
  //   }

  //   runThis();
  // }, []);

  return (
    <div className="bg-gray-900 h-[100px] flex items-center gap-5 pl-5">
      <h1 className="text-2xl font-extrabold">BLOCK-TODO</h1>
      <Link
        to="gallary"
        className="bg-blue-400 rounded-lg px-2 py-1.5"
      >
        Gallary
      </Link>
    </div>
  );
};

export default Header;
