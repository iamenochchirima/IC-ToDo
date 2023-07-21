import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";

const Header = () => {
  const [authorized, setAuthorized] = useState(false);
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
    setAuthorized(true)
    console.log("principalId", principalId);
  };

  const checkAuth = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      setAuthorized(true)
    } 
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const logOut = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout()
    setAuthorized(false)
  }
  

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
        {authorized ? <button onClick={logOut} className="px-2 py-1.5">
          Logout
        </button> : <button onClick={login} className="px-2 py-1.5">
          Login
        </button>}
      </div>
    </div>
  );
};

export default Header;
