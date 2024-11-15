import React from 'react';
import './TopBar.css';
import { FaGithub } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="logo">
      </div>
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
