import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './App.css';
import logo from './assets/logo.png';
import { modelApiCall } from './helpers/modelHelper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainComponent = () => {
  const [selectedVisualization, setSelectedVisualization] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const visualizations = [
    { id: 1, name: "3 creekhouse", video: "./assets/1.mov", phrase: "3 creekhouse" },
    { id: 2, name: "scales/kuhaylah", video: "./assets/2.mov", phrase: "scales/kuhaylah" },
    { id: 3, name: "1383 william lanier", video: "./assets/3.mov", phrase: "1383 william lanier" }
  ];

  const models = [
    { name: "CTC", description: "The Connectionist Temporal Classification model is designed for sequence tasks where input and output lengths may vary. It excels in aligning sequences without requiring predefined mappings, ideal for translating variable-length gesture sequences into sign language phrases." },
    { name: "Seq2Seq", description: "A sequence-to-sequence model featuring an encoder-decoder architecture. It effectively maps input sequences (e.g., hand gestures) to output sequences (text phrases). This model captures dependencies within the sequence, suitable for language interpretation tasks." },
    { name: "Transformer", description: "This attention-based model processes sequences in parallel, allowing it to capture long-range dependencies efficiently. Its architecture makes it particularly effective for structured sequence tasks like sign language translation, where context across the entire sequence is critical." }
  ];

  const notifyError = (message) => {
    console.log(message);
    toast.info(message, { position: 'top-center' });
  };

  const handleSubmit = async () => {
    if (!selectedVisualization || !selectedModel) {
      notifyError('Please select both a visualization and a model.');
      return;
    }

    const selectedPhrase = visualizations.find(vis => vis.id === selectedVisualization)?.phrase;

    setLoading(true);
    setResult('');

    try {
      const resultPhrase = await modelApiCall(selectedPhrase, selectedModel);
      setResult(resultPhrase);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div>
        <img src={logo} alt="Logo" width="450" height="300" className="logo" />
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
              <div className="video-container">
                <ReactPlayer
                  className="video-player"
                  url={vis.video}
                  width="100%"
                  loop
                  playing
                  muted
                />
              </div>
            </div>
          ))}
        </section>
        <section className="visualizations" style={{ marginTop: "40px" }}>
          {models.map((model) => (
            <Tippy
              content={<span dangerouslySetInnerHTML={{ __html: model.description }} />}
              allowHTML={true}
              theme="custom"
              key={`${model.name}-${selectedModel === model.name ? 'active' : 'inactive'}`}
            >
              <div
                className={`visualization-card ${selectedModel === model.name ? 'selected' : ''}`}
                onClick={() => setSelectedModel(model.name)}
              >
                <h2>{model.name}</h2>
              </div>
            </Tippy>
          ))}
        </section>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading} 
          style={{ opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          Submit
        </button>

        <div className="result-section">
          {loading ? (
            <div className="loader">
              <div className="neuron"></div>
              <div className="neuron"></div>
              <div className="neuron"></div>
              <div className="neuron"></div>
              <div className="neuron"></div>
            </div>
          ) : (
            result && <p className="result-text">{result}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainComponent;
