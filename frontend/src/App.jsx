import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainComponent from './MainComponent';
import ComparisonDashboard from './ComparisonDashboard';
import TopBar from './TopBar';
import './App.css';

const App = () => {

  return (
    <>
      <TopBar />
      <ToastContainer />
      <MainComponent />
      <ComparisonDashboard />
    </>
  );
};

export default App;
