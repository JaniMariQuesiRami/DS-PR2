import React from 'react';
import MainComponent from './MainComponent';
import ComparisonDashboard from './ComparisonDashboard';
import TopBar from './TopBar';
import './App.css';

const App = () => {
  return (
    <>
      <TopBar />
      <MainComponent />
      <ComparisonDashboard />
    </>
  );
};

export default App;
