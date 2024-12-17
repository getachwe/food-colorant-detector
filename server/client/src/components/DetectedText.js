import React from "react";

function DetectedText({ text }) {
  return (
    <div className="detected-text">
      <h3>Detected Text</h3>
      <p>{text}</p>
    </div>
  );
}

export default DetectedText;
