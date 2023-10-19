// 20000000000000000
import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import "./Modal.css";

const StoreModal = ({ setModalOpen, contract, account }) => {
  const [buyState, setBuyState] = useState(false);
  const buy = async () => {
    const address = document.querySelector(".address").value;
    setBuyState(true);
    // Fetch the length from the contract
    const len = await contract.displayDataLength(address);

    console.log(len.toNumber());
    // Calculate the amount to send
    const amountInEther = (len.toNumber() + 1) * (0.01);
    console.log(amountInEther);
    // Convert the amount to Wei
    const amountInWei = (ethers.utils.parseUnits(amountInEther.toString(), 'ether'));
    console.log(amountInWei.toString());

    // Call the contract function and specify the "value" parameter
    await contract.placeBuyRequest(address, {value:amountInWei });
    // await contract.placeBuyRequest(address).send({
    //   from: account, // The sender's address
    //   value: amountToSend, // The amount of Ether to send
    //   // gas: 200000, // Specify the gas limit
    // });
    // await contract.placeBuyRequest(address);
    setBuyState(false);
    setModalOpen(false);
  };
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Place a Buy Request to</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>

          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => buy()}>
              {buyState ? "Buying!" : "Buy"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default StoreModal;
