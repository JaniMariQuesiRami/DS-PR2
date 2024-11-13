import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import logo from './assets/logo.png';

const App = () => {
  const [selectedVisualization, setSelectedVisualization] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const visualizations = [
    { id: 1, name: "Visualization 1", video: "./assets/1.mov" },
    { id: 2, name: "Visualization 2", video: "./assets/2.mov" },
    { id: 3, name: "Visualization 3", video: "./assets/3.mov" }
  ];

  const models = ["Seq2Seq", "Transformer", "CTC"];

  const handleSubmit = () => {
    if (selectedVisualization === null || !selectedModel) {
      alert("Please select a visualization and a model.");
      return;
    }

    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visualizationId: selectedVisualization,
        model: selectedModel,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Prediction: ${data.prediction}`);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="App">
      <div>
        <img src={logo} alt="Your Logo" width="600" height="400" className="logo" />
      </div>
      <main>
        <section className="visualizations">
          {visualizations.map((vis) => (
            <div
              key={vis.id}
              className={`visualization-card ${selectedVisualization === vis.id ? 'selected' : ''}`}
              onClick={() => setSelectedVisualization(vis.id)}
            >
              <h2>{vis.name}</h2>
              <ReactPlayer 
                url={vis.video} 
                width="100%" 
                height="200px"
                loop
                playing
                muted
              />
            </div>
          ))}
        </section>
        <section className="visualizations">
          {models.map((model) => (
            <div
              key={model}
              className={`visualization-card ${selectedModel === model ? 'selected' : ''}`}
              onClick={() => setSelectedModel(model)}
            >
              <h2>{model}</h2>
            </div>
          ))}
        </section>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Data
        </button>
      </main>
    </div>
  );
};

export default App;
