import React from "react";
import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
require('dotenv').config();

const FileUpload = ({ Account, Contract, Provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file Selected");
  const [disableUpload, setDisableUpload] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableUpload(true);
    setFileName("Uploading");
    console.log()
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        // pinata api call
      
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(resFile.data);
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await Contract.add(Account, ImgHash);
        alert("File Successfully upoaded");
        setFileName("No File Selected");
        setFile(null);
      } catch (err) {
        alert(err);
        console.log("error in uploading");
      }
    }
  };

  const retreiveFile = (e) => {
    e.preventDefault();
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    setDisableUpload(false);
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose file!
        </label>
        <input
          disabled={!Account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retreiveFile}
        ></input>
        <span className="textArea"> {fileName} </span>
        <button type="submit" className="upload" disabled={disableUpload}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
