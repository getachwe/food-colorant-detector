import React from "react";

function ImageDetails({ data }) {
  const { text, colorants } = data;

  return (
    <div>
      <h3>טקסט שזוהה:</h3>
      <p>{text || "לא זוהה טקסט בתמונה."}</p>
      <h3>צבעי מאכל שזוהו:</h3>
      {colorants && colorants.length > 0 ? (
        <ul>
          {colorants.map((colorant, index) => (
            <li key={index}>{colorant}</li>
          ))}
        </ul>
      ) : (
        <p>לא זוהו צבעי מאכל.</p>
      )}
    </div>
  );
}

export default ImageDetails;
