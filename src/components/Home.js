import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';
import Display from "./Display";
import FileUpload from "./FileUpload";
import { useState, useEffect } from "react";
import StoreModal from "./StoreModal.js";

// import Upload from '../artifacts/contracts/Upload.sol/Upload.json';
// import Upload from './Upload.json';
import "./Home.css";


// import { ethers } from "ethers";

function Home({Account, Contract, Provider}) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleShareButton = () => {
    // Use the navigate function to redirect to a specific route
    navigate('/shareaccess'); // Replace '/about' with the route you want to navigate to
  };

  const handleStoreButton = ()=> {
    setModalOpen(true);
  };

  return (
    <div>
      {modalOpen && (
        <StoreModal setModalOpen={setModalOpen} contract={Contract} account ={Account}></StoreModal>
      )}
      <div className="container">
      <button className="store" onClick={handleStoreButton}>
          Buy
      </button>
      <button className="share" onClick={handleShareButton}>
          Share
      </button>
      
      
      </div>
     
      <div className="App">
      <div className ="acc" style={{ color: "black" }}>
          Account : {Account ? Account : "Not connected"}
      </div>
      <h1 style={{ color: "white" }}>Web3.0 File Sharing</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

       
        <FileUpload
          Account={Account}
          Provider={Provider}
          Contract={Contract}
        ></FileUpload>
        <Display Contract={Contract} Account={Account}></Display>
      </div>
    </div>
  );
}

export default Home;
