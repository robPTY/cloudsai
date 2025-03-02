import React from "react";
import "./BodyCard.css";

const BodyCard = () => {
  return (
    <div className="cardBody">
      <div className="cardHeader">
        <h2 className="cardHeaderText">Cloud Identifier</h2>
        <p className="text-center text-sky-600 text-sm mt-1">
          Take a photo or upload an image of a cloud to identify it
        </p>
      </div>
    </div>
  );
};

export default BodyCard;
