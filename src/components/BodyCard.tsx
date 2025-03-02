import React, { useState } from "react";
import CameraSVG from "../assets/svgs/camera.svg";
import UploadSVG from "../assets/svgs/upload.svg";
import "./BodyCard.css";

const BodyCard = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded_file = e.target.files?.[0];
  };
  return (
    <div className="cardBody">
      <div className="cardHeader">
        <h2 className="cardHeaderText">Cloud Identifier</h2>
        <p className="text-center text-sky-600 text-sm mt-1">
          Take a photo or upload an image of a cloud to identify it
        </p>
      </div>
      <div className="cloudReader">
        {!cameraActive && !image && (
          <div className="defaultReader">
            <p>Upload a cloud image or take a photo</p>
            <div className="buttonStorer">
              <button className="Button">
                <img className="SVG" src={UploadSVG} />
                Upload
              </button>
              <button className="Button">
                <img className="SVG" src={CameraSVG} />
                Camera
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="appFooter">Powered by roberto ai.</div>
    </div>
  );
};

export default BodyCard;
