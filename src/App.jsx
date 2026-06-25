import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState({ r: 255, g: 0, b: 0 });
  const [mixedColor, setMixedColor] = useState({ r: 255, g: 255, b: 255 });
  const [score, setScore] = useState(100);
  const [rounds, setRounds] = useState(0);

  // Generate a random target color
  const generateNewTarget = () => {
    const newTarget = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    };
    setTargetColor(newTarget);
    setMixedColor({ r: 255, g: 255, b: 255 }); // Reset to white
    setRounds(rounds + 1);
  };

  // Calculate match score based on color difference
  useEffect(() => {
    const diff = Math.abs(mixedColor.r - targetColor.r) +
                 Math.abs(mixedColor.g - targetColor.g) +
                 Math.abs(mixedColor.b - targetColor.b);
    const maxDiff = 255 * 3;
    const matchScore = Math.round(((maxDiff - diff) / maxDiff) * 100);
    setScore(matchScore);
  }, [mixedColor, targetColor]);

  // Initialize game on load
  useEffect(() => {
    generateNewTarget();
  }, []);

  // Add color to the mix (averaging)
  const addColor = (color) => {
    setMixedColor({
      r: Math.round((mixedColor.r + color.r) / 2),
      g: Math.round((mixedColor.g + color.g) / 2),
      b: Math.round((mixedColor.b + color.b) / 2),
    });
  };

  // Reset the current mix
  const resetMix = () => {
    setMixedColor({ r: 255, g: 255, b: 255 });
  };

  const rgbString = (color) => `rgb(${color.r}, ${color.g}, ${color.b})`;

  return (
    <div className="App">
      <div className="game-container">
        <h1>🎨 Color Mix Game - Easy Mode</h1>
        
        <div className="info-section">
          <p className="round-counter">Round: {rounds}</p>
          <p className="score-display">Match: {score}%</p>
        </div>

        <div className="color-display-section">
          <div className="color-box-wrapper">
            <p className="label">Target Color</p>
            <div 
              className="color-box target" 
              style={{ backgroundColor: rgbString(targetColor) }}
            ></div>
          </div>

          <div className="arrow">→</div>

          <div className="color-box-wrapper">
            <p className="label">Your Color</p>
            <div 
              className="color-box mixed" 
              style={{ backgroundColor: rgbString(mixedColor) }}
            ></div>
          </div>
        </div>

        <div className="buttons-section">
          <h3>Add Color by Clicking:</h3>
          <div className="color-buttons">
            <button 
              className="color-btn red"
              onClick={() => addColor({ r: 255, g: 0, b: 0 })}
              style={{ backgroundColor: 'rgb(255, 0, 0)' }}
            >
              🔴 Red
            </button>
            <button 
              className="color-btn green"
              onClick={() => addColor({ r: 0, g: 255, b: 0 })}
              style={{ backgroundColor: 'rgb(0, 255, 0)' }}
            >
              🟢 Green
            </button>
            <button 
              className="color-btn blue"
              onClick={() => addColor({ r: 0, g: 0, b: 255 })}
              style={{ backgroundColor: 'rgb(0, 0, 255)' }}
            >
              🔵 Blue
            </button>
            <button 
              className="color-btn yellow"
              onClick={() => addColor({ r: 255, g: 255, b: 0 })}
              style={{ backgroundColor: 'rgb(255, 255, 0)' }}
            >
              🟡 Yellow
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn reset" onClick={resetMix}>
            Reset
          </button>
          <button className="btn next" onClick={generateNewTarget}>
            Next
          </button>
        </div>

        <div className="tips">
          <p><strong>How to play:</strong> Click the color buttons to mix paint and match the target color!</p>
          <p><strong>Tip:</strong> Click colors multiple times to get different shades.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
