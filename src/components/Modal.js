import React from 'react';
import { useState, useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract, id, address }) => {
  const [state , setState] = useState(false);
  const sharing = async () => {
    setState(true);
    await contract.approveBuyRequest(id);
    setState(false);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.displayAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
              value={address} 
              disabled
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>{state ? "Sharing!" : "Share"}</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;