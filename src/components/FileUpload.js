import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FileUpload.css";
const JWT =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhN2E3NTY3Ny0zNzkxLTRiMjUtYjM5NC05NWU3NzQ5MjE5YTIiLCJlbWFpbCI6InRvdG9ucGF1bDczQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4NDliNTBiMDU2Mzg5MmE0ZmQ3ZCIsInNjb3BlZEtleVNlY3JldCI6IjEzNGZhMTIyMzczM2Y5Mjk1MmI0ZGZiNzc1ZDVmYzI2MTFlNTRkM2U0NDE1ZjkyMzJhYWJmZGY3MTMxMWY5N2IiLCJpYXQiOjE2OTYzMzgzMTF9.0GO6zxQGRwjrCP5Nx7Z9HdS1tdVcWz4BrxD9sXdV430"

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
