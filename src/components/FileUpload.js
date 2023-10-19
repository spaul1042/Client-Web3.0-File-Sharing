import React from "react";
import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ Account, Contract, Provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image Selected");
  const [disableUpload, setDisableUpload] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableUpload(true);
    setFileName("Uploading");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        // pinata api call
      
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `849b50b0563892a4fd7d`,
            pinata_secret_api_key: `134fa1223733f92952b4dfb775d5fc2611e54d3e4415f9232aabfdf71311f97b`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(resFile.data);
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await Contract.add(Account, ImgHash);
        alert("Image Successfully upoaded to IPFS using Pinata key");
        setFileName("No Image Selected");
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
          Choose image
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