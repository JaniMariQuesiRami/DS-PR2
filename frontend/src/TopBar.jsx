import React from 'react';
import './TopBar.css';
import { FaGithub } from 'react-icons/fa';
import { SiKaggle } from 'react-icons/si';

const TopBar = () => {
  return (
    <div className="top-bar">
      <a 
        href="https://www.kaggle.com/competitions/asl-fingerspelling/rules"
        target="_blank" 
        rel="noopener noreferrer" 
        className="kaggle-link"
      >
        <SiKaggle size={50} />
      </a>
      <a 
        href="https://github.com/JaniMariQuesiRami/DS-PR2" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="github-link"
      >
        <FaGithub size={30} />
      </a>
    </div>
  );
};

export default TopBar;
