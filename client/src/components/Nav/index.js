import React, { useEffect, useState }  from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "../../utils/interact";

function Nav() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  
  useEffect(async () => { //TODO: implement
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status); 
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
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
        <ul className="flex w-1/2 justify-end content-center">
          <li className="inline-block text-blue-700 no-underline hover:text-indigo-900 hover:text-underline text-center h-auto p-4">
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li className="inline-block text-blue-700 no-underline hover:text-indigo-900 hover:text-underline text-center h-auto p-4">
            <Link to="/add-property">
              Add Property
            </Link>
          </li>
          <li className="inline-block text-blue-700 no-underline hover:text-indigo-900 hover:text-underline text-center h-auto p-4">
          <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
          </li>

          <li className="inline-block text-blue-700 no-underline hover:text-indigo-900 hover:text-underline text-center h-auto p-4">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex w-1/2 justify-end content-center">
          <li className="inline-block text-blue-700 no-underline hover:text-indigo-900 hover:text-underline text-center h-auto p-4">
            <Link to="/register">
              Register
            </Link>
          </li>
          <li className="inline-block text-blue-700 no-underline hover:text-indigo-900 hover:text-underline text-center h-auto p-4">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="w-full container mx-auto p-6 flex items-center justify-between">
      <h1 className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-4xl">
        <Link to="/">
          KeyStone
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
