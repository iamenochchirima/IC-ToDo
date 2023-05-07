import React, { useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";

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
    <div className="bg-gray-900 h-[100px] flex items-center pl-5">
      <h1 className="text-2xl font-extrabold">BLOCK-TODO</h1>
    </div>
  );
};

export default Header;
