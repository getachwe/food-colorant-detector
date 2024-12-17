import React from "react";

function ResultSection({ colorants }) {
  return (
    <div className="result-section">
      <h2>Detected Colorants</h2>
      <ul>
        {colorants.map((colorant, index) => (
          <li key={index} className="colorant-item">
            <strong>{colorant.name}</strong>
            <br />
            <a
              href={colorant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="colorant-link"
            >
              Learn More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultSection;
