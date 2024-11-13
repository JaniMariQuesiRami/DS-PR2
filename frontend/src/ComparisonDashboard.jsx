// ComparisonDashboard.jsx
import React from 'react';
import './ComparisonDashboard.css';

const ComparisonDashboard = () => {
  const graphs = [
    { id: 1, title: 'CTC', image: './assets/ctc_loss.png' },
    { id: 2, title: 'Seq2Seq', image: './assets/Seq2Seq_loss.png' },
    { id: 3, title: 'Transformer', image: './assets/transformer_loss.png' },
  ];

  const levScores = [
    { id: 1, title: 'CTC', score: 0.93 },
    { id: 2, title: 'Seq2Seq', score: 0.76 },
    { id: 3, title: 'Transformer', score: 0.45 },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Model Loss Comparison</h1>
      <div className="graph-container">
        {graphs.map((graph) => (
          <div key={graph.id} className="graph-card">
            <h2>{graph.title}</h2>
            <img src={graph.image} alt={graph.title} className="graph-image" />
          </div>
        ))}
      </div>

      <h1 className="dashboard-title" style={{ marginTop: '100px' }}>Levenshtein Distance Scores</h1>
      <div className="graph-container" style={{ marginBottom: '100px' }}>
        {levScores.map((model) => (
          <div key={model.id} className="graph-card">
            <h2>{model.title}</h2>
            <p className="lev-score">{model.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonDashboard;
