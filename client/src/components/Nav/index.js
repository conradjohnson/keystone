import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_WALLET } from "../../utils/mutations";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "../../utils/interact";

function Nav() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [updateUserWallet] = useMutation(UPDATE_USER_WALLET);

  useEffect(() => {
    //TODO: implement
    async function fetchData() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      addWalletListener();
    }

    fetchData();
  }, []);

  const setUserWallet = async (walletAddress) => {
    let userId = Auth.getProfile().data._id;
    let updatedUser = await updateUserWallet({
      variables: {
        id: userId,
        wallet: walletAddress,
      },
    });
  };

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    setUserWallet(walletResponse.address);
  };
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex w-1/2 content-center">
          <Link
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded text-center"
            to="/profile"
          >
            Profile
          </Link>

          <button
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded text-center"
            id="walletButton"
            onClick={connectWalletPressed}
          >
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>

          {/* this is not using the Link component to logout or user and then refresh the application to the start */}
          <a
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded"
            href="/"
            onClick={() =>  Auth.logout()}
          >
            Logout
          </a>
        </ul>
      );
    } else {
      return (
        <ul className="flex w-1/2 justify-end content-center">
          <Link
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded text-center"
            to="/register"
          >
            Register
          </Link>

          <Link
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded"
            to="/login"
          >
            Login
          </Link>
        </ul>
      );
    }
  }

  return (
    <header className="w-full mx-auto p-6 flex items-center justify-between">
      <h1 className="flex items-center text-purple-700 no-underline hover:no-underline font-bold text-5xl">
        <Link to="/">KeyStone</Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
