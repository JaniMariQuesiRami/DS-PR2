import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Default Tippy styles
import './ComparisonDashboard.css';

const ComparisonDashboard = () => {
  const graphs = [
    { 
      id: 1, 
      title: 'CTC', 
      image: './assets/ctc_loss.png', 
      description: `The CTC model starts with a high loss (~600) and quickly stabilizes 
      around 10-20. This indicates its ability to align sequences efficiently, suitable for variable-length tasks.` 
    },
    { 
      id: 2, 
      title: 'Seq2Seq', 
      image: './assets/Seq2Seq_loss.png', 
      description: `The Seq2Seq model starts with a higher loss (~2.75) but rapidly 
      decreases and stabilizes around lower values, showing good convergence and generalization.` 
    },
    { 
      id: 3, 
      title: 'Transformer', 
      image: './assets/transformer_loss.png', 
      description: `The Transformer shows a smooth and gradual reduction in loss 
      (~0.9 initially), demonstrating strong stability and convergence, with minimal overfitting.` 
    },
  ];

  const levScores = [
    { id: 1, title: 'CTC', score: 0.93 },
    { id: 2, title: 'Seq2Seq', score: 0.76 },
    { id: 3, title: 'Transformer', score: 0.45 },
  ];

  const trainingTimes = [
    { id: 1, title: 'CTC', epochs: '25 epochs', time: '3h 30m' },
    { id: 2, title: 'Seq2Seq', epochs: '20 epochs', time: '1h' },
    { id: 3, title: 'Transformer', epochs: '13 epochs', time: '30m' },
  ];

  const strengthsWeaknesses = [
    { 
      model: 'Transformer', 
      strengths: ['Handles long-term dependencies', 'Highly parallelizable, speeds up training'], 
      weaknesses: ['Requires large datasets and computing power', 'Less effective with raw time series data without modifications'] 
    },
    { 
      model: 'Seq2Seq', 
      strengths: ['Effective for sequence mapping tasks', 'Flexible for translations or structured sequences'], 
      weaknesses: ['Hard to manage long sequences due to memory issues', 'May lose context in long sequences due to its recurrent nature'] 
    },
    { 
      model: 'CTC', 
      strengths: ['No need for explicit alignment, great for continuous sequences like ASL', 'Handles variable-length sequences'], 
      weaknesses: ['Dependent on preprocessing for segmenting gestures', 'May not capture long-term context as well as Transformer'] 
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Model Loss Comparison</h1>
      <div className="graph-container">
        {graphs.map((graph) => (
          <Tippy key={graph.id} content={graph.description} theme="custom" placement="top">
            <div className="graph-card">
              <h2>{graph.title}</h2>
              <img src={graph.image} alt={graph.title} className="graph-image" />
            </div>
          </Tippy>
        ))}
      </div>

      <Tippy 
        content={
          <div style={{ textAlign: 'center' }}>
            <p>Levenshtein distance measures sequence similarity.</p>
            <p>Score Formula:</p>
            <img
              src="./assets/formula.png"
              alt="Score formula"
              style={{ width: '330px', marginTop: '10px' }}
            />
            <p>Higher scores indicate closer matches.</p>
          </div>
        } 
        theme="custom"
      >
        <h1 className="dashboard-title" style={{ marginTop: '100px', cursor: 'help' }}>
          Levenshtein Distance Scores
        </h1>
      </Tippy>

      <div className="graph-container" style={{ marginBottom: '100px' }}>
        {levScores.map((model) => (
          <div key={model.id} className="graph-card">
            <h2>{model.title}</h2>
            <p className="lev-score">{model.score}</p>
          </div>
        ))}
      </div>

      <Tippy 
        content="Training was conducted on a GPU P100 using the Kaggle Notebooks runtime." 
        theme="custom"
      >
        <h1 className="dashboard-title" style={{ marginTop: '100px', cursor: 'help' }}>
          Training
        </h1>
      </Tippy>

      <div className="graph-container" style={{ marginBottom: '100px' }}>
        {trainingTimes.map((model) => (
          <div key={model.id} className="graph-card">
            <h2>{model.title}</h2>
            <p className="lev-score">{model.epochs}</p>
            <h2>{model.time}</h2>
          </div>
        ))}
      </div>
      <h1 className="dashboard-title" style={{ marginTop: '100px' }}>
        Strengths & Weaknesses Comparison
      </h1>
      <div className="single-card-container">
        <div className="strengths-weaknesses-card">
          <table className="strengths-weaknesses-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Strengths</th>
                <th>Weaknesses</th>
              </tr>
            </thead>
            <tbody>
              {strengthsWeaknesses.map((entry) => (
                <tr key={entry.model} className="table-header">
                  <td>{entry.model}</td>
                  <td>
                    <ul className="strengths-list">
                      {entry.strengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="weaknesses-list">
                      {entry.weaknesses.map((weakness, idx) => (
                        <li key={idx}>{weakness}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonDashboard;
