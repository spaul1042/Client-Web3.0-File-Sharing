import React from "react";
import "./Store.css"; // Import the CSS file
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  StoreModal from "./StoreModal.js";

const Store = ({ Account, Contract, Provider }) => {
  
  const [users, setUsers] = useState([]);
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
    const usersList = async () => {
      const  data = await Contract.displayUsers();
    // const data = [{add: "test1", id:0, lenOfData: 1}, {add: "test2", id:1, lenOfData: 10}, {add: "test3", id:2, lenOfData: 3}]
      setUsers(data);
    };
    Contract && usersList();

  });
  return (
    <>
      {modalOpen && (
        <StoreModal
          setModalOpen={setModalOpen}
          contract={Contract}
          id={id}
          address={address}
        ></StoreModal>
      )}

      <div
        className="butt"
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Back to Home{" "}
      </div>

      <div className="buy-request-list">
        <div className="header">
          User List with their data
        </div>
        {/* {buyRequestsJSX} */}
        <>
          {users.map((request) => (
            <div
              key={request.id}
              className={`buy-request open`}
            >
              <div className="request-info">
                <div className="user-info">
                  <span className="txt">user {(request.id).toString()} : {request.add} , </span>
                </div>
                <div className="deal-amount">
                  <span className="txt">Data length : {request.lenOfData.toString()} </span>
                </div>
              </div>
                <div className="status open">

                  <button
                    className="share-button"
                    onClick={() => handleRequest(request.id, request.add)}
                  >
                    (Buy)
                  </button>
                </div>
              
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default Store;
