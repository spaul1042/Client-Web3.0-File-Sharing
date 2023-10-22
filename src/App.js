import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route} from 'react-router-dom';
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

        console.log(Account);
        console.log(Contract);
        console.log(Provider);

        // contract address, contract abi and signer, we need these three things if we wanna create an instance of the contract
      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();
  }, []);
  return (
    <div>
      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<Home Account ={Account} Contract ={Contract} Provider ={Provider} />} />
        <Route path="/shareaccess" element={<ShareAccess Account = {Account} Contract ={Contract} Provider ={Provider} />} />
        <Route path="/store" element={<Store Account = {Account} Contract ={Contract} Provider ={Provider} />} />
      </Routes>
    </div>
  );
}

export default App;
