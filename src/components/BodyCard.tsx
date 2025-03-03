import React, { useState, useRef } from "react";
import CameraSVG from "../assets/svgs/camera.svg";
import SpinnerSVG from "../assets/svgs/spinner.svg";
import RightArrowSVG from "../assets/svgs/right_arrow.svg";
import CloudSVG from "../assets/svgs/cloud.svg";
import UploadSVG from "../assets/svgs/upload.svg";
import "./BodyCard.css";

const BodyCard = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const identifyCloud = () => {
    if (!image) return;

    setIsLoading(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded_file = e.target.files?.[0];
    if (uploaded_file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(uploaded_file);
    }
  };

  const handleMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  return (
    <div className="cardBody">
      <input
        type="file"
        ref={fileInputRef}
        className="hiddenInput"
        onChange={handleFileUpload}
        accept="image/*"
      />
      <div className="cardHeader">
        <h2 className="cardHeaderText">Roberto's Cloud Identifier</h2>
        <p>Take a photo or upload an image of a cloud to identify it</p>
      </div>
      <div className="cloudReader">
        {!cameraActive && !image && (
          <div className="defaultReader">
            <img src={CloudSVG} className="" />
            <p>Upload a cloud image or take a photo</p>
            <div className="buttonStorer">
              <button
                className="Button"
                onClick={() => fileInputRef.current?.click()}
              >
                <img className="SVG" src={UploadSVG} />
                Upload
              </button>
              <button className="Button" onClick={handleMedia}>
                <img className="SVG" src={CameraSVG} />
                Camera
              </button>
            </div>
          </div>
        )}
        {image && !cameraActive && (
          <div className="imageContainerBody">
            <div className="imageContainer">
              <img src={image} alt="Uploaded cloud" className="objectCover" />
            </div>
            <div className="activeButtonContainer">
              <button className="Button" onClick={() => setImage(null)}>
                New Photo
              </button>
              <button
                className="cloudLoadButton"
                onClick={identifyCloud}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <img className="SVG loaderIcon" src={SpinnerSVG} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Identify Cloud
                    <img className="SVG_RIGHT" src={RightArrowSVG} />
                  </>
                )}
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
