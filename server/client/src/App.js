import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import LoadingMessage from "./components/LoadingMessage.js";
import ResultSection from "./components/ResultSection";
import DetectedText from "./components/DetectedText";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [colorants, setColorants] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setColorants(response.data.colorants);
      setText(response.data.text);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <ImageUpload
        onImageChange={handleImageChange}
        onImageUpload={handleImageUpload}
      />
      {loading && <LoadingMessage />}
      {colorants.length > 0 && <ResultSection colorants={colorants} />}
      {text && <DetectedText text={text} />}
    </div>
  );
}

export default App;
