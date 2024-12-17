import React from "react";

const Result = ({ result }) => {
  return (
    <div className="Result">
      <h2>Detected Colorants:</h2>
      <ul>
        {result.colorants.map((colorant, index) => (
          <li key={index}>{colorant}</li>
        ))}
      </ul>
      <h2>Extracted Text:</h2>
      <p>{result.text}</p>
    </div>
  );
};

export default Result;
