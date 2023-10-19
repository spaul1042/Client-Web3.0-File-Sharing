import React from "react";
import "./ShareAccess.css"; // Import the CSS file
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.js";

const ShareAccess = ({ Account, Contract, Provider }) => {
  const testBuyRequests = [
    { id: 0, user: "test", dealAmount: "0.01", closed: true },
    { id: 1, user: "test2", dealAmount: "0.01", closed: false },
  ];
  const [buyRequests, setBuyRequests] = useState([]);
  const [buyRequestsJSX, setBuyRequestsJSX] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  const handleRequest = (id, address) => {
    setModalOpen(true);
    setId(id);
    setAddress(address);
    console.log(id, address);
  };

  useEffect(() => {
    const buyRequestList = async () => {
      const requests = await Contract.displayBuyRequests();
      setBuyRequests(requests);
    };
    Contract && buyRequestList();

  });
  return (
    <>
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          contract={Contract}
          id={id}
          address={address}
        ></Modal>
      )}

      <a
        className="butt"
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Back to Home{" "}
      </a>

      <div className="buy-request-list">
        <div className="header">
          Account : <span className="acc">{Account} </span>: Buy Requests{" "}
        </div>
        {/* {buyRequestsJSX} */}
        <>
          {buyRequests.map((request) => (
            <div
              key={request.id}
              className={`buy-request ${request.closed ? "closed" : "open"}`}
            >
              <div className="request-info">
                <div className="user-info">
                  <span className="txt">Buyer : {request.user} , </span>
                </div>
                <div className="deal-amount">
                  <span className="txt">Deal Amount : {request.dealAmount.toString()} wei</span>
                </div>
              </div>
              {request.closed ? (
                <span className="status closed">Closed</span>
              ) : (
                <div className="status open">
                  <span>Open</span>

                  <button
                    className="share-button"
                    onClick={() => handleRequest(request.id, request.user)}
                  >
                    Share
                  </button>
                </div>
              )}
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default ShareAccess;
