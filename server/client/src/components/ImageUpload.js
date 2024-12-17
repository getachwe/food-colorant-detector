import React from "react";

function ImageUpload({ onImageChange, onImageUpload }) {
  return (
    <div className="upload-section">
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="image-upload-input"
      />
      <button onClick={onImageUpload} className="upload-button">
        Upload Image
      </button>
    </div>
  );
}

export default ImageUpload;
