import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.js";
import ShareAccess from "./components/ShareAccess.js";
import Store from "./components/Store.js";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";

function App() {
  const [Account, setAccount] = useState("");
  const [Contract, setContract] = useState(null);
  const [Provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Request access to the user's wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the current selected account
        const accounts = await Provider.listAccounts();
        const selectedAccount = accounts[0];

        // Set the current account and mark as connected
        setAccount(selectedAccount);
        setConnected(true);
      } else {
        alert(
          "Please install and unlock MetaMask or another compatible wallet."
        );
      }
    } catch (error) {
      console.error("Error connecting the wallet:", error);
    }
  };

  // Function to disconnect the wallet
  const disconnectWallet = () => {
    setConnected(false);
    setAccount("");
  };

  useEffect(() => {
    console.log(ethers.providers);
    const provider = window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null; // can only read state or data

    // const provider = new ethers.providers.Web3Provider(web3.currentProvider);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const address = await signer.getAddress();

        const contractAddress = "0x20e6599373d18C288dDf4a3b644f5EbB1F50563C";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );

        setAccount(address);
       
        setContract(contract);
        setProvider(provider);

        console.log(address);
        console.log(Contract);
        console.log(Provider);
        if(address) setConnected(true);

        // contract address, contract abi and signer, we need these three things if we wanna create an instance of the contract
      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();
  }, []);
  return (
    <div>
      <div>
        {connected ? (
          <button className="connect" onClick={disconnectWallet}>
            Disconnect
          </button>
        ) : (
          <button className="connect" onClick={connectWallet}>
            Connect
          </button>
        )}

        {/* Your content goes here */}
      </div>
      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route
          path="/"
          element={
            <Home Account={Account} Contract={Contract} Provider={Provider} />
          }
        />
        <Route
          path="/shareaccess"
          element={
            <ShareAccess
              Account={Account}
              Contract={Contract}
              Provider={Provider}
            />
          }
        />
        <Route
          path="/store"
          element={
            <Store Account={Account} Contract={Contract} Provider={Provider} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
