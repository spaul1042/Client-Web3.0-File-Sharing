import React from "react";
import { useState } from "react";
import "./Display.css";
// require('dotenv').config();

const Display = ({ Contract, Account }) => {
  const GATEWAY = "https://emerald-leading-landfowl-64.mypinata.cloud/ipfs"
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray = [];
    let chk = false;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        // console.log(Account);
        dataArray = await Contract.displayData(Otheraddress);
        // console.log(dataArray);
      } else {
        // console.log(Account);
        dataArray = await Contract.displayData(Account);
        // console.log(dataArray);
      }
    } catch (e) {
      console.log(e);
      chk = true;
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      // console.log(str);
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <div onClick={() => window.open(`${GATEWAY}/${item.substring(34)}`, '_blank')}>
            <div className="blur-block">

              <div className="link">{`ipfs/click Me!😀`}</div>
            </div>
          </div>
        );
      });
      setData(images);
    } else {
      if(!chk)
      alert("No image to display");
    }
  };
  return (
    <>
      
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <div className="image-list">{data}</div>
    </>
  );
};
export default Display;
