import React, { useState, useEffect } from 'react';
import Grid from './grid'; 

const gridSizes = {
  '6x6': 'https://prog2700.onrender.com/threeinarow/6x6',
  '8x8': 'https://prog2700.onrender.com/threeinarow/8x8',
  '10x10': 'https://prog2700.onrender.com/threeinarow/10x10',
  '12x12': 'https://prog2700.onrender.com/threeinarow/12x12',
  '14x14': 'https://prog2700.onrender.com/threeinarow/14x14',
  'Random': 'https://prog2700.onrender.com/threeinarow/random',
};

const colors = ['gold', '#B366FF', 'white'];

const Game = () => {
  const [api] = useState('https://prog2700.onrender.com/threeinarow/sample');
  const [gridData, setGridData] = useState({
    rows: [], 
  });
  const [showIncorrectSquares, setShowIncorrectSquares] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch grid data from API endpoint and update state
    const fetchGrid = async (api) => {
      try {
        const response = await fetch(api);
        const data = await response.json();

        const updatedGridData = {
          rows: data.rows.map((row) =>
            row.map((square) => ({
              ...square,
              originalState: square.currentState,
            }))
          ),
        };
  
        setGridData(updatedGridData); 
      } catch (error) {
        console.error('Error fetching grid data:', error);
      }
    };
  
    fetchGrid(api); 
  }, [api]); // Runs only when 'api' state variable changes

  // Fetch grid data based on grid size
  const fetchGrid = (gridSize) => {
    const api = gridSizes[gridSize];
    fetch(api)
      .then(response => response.json())
      .then(json => {
        setGridData(json);
      }).catch(error => console.error(error));
  }
  
  // Check game state for correctness and update grid and game message accordingly
  const checkGameState = () => {
    let allCorrect = true;
    let allCurrentOrCorrect = true;
    let newMessage = '';
  
    const updatedGridData = { ...gridData }; 
  
    updatedGridData.rows = updatedGridData.rows.map((row, i) => {
      return row.map((square, j) => {
        if (square.currentState !== square.correctState) {
          allCorrect = false;
        }
        if (square.currentState !== square.correctState && square.currentState !== square.originalState) {
          allCurrentOrCorrect = false;
        }
        return square;
      });
    });
  
    if (allCorrect) {
      newMessage = 'You did it!!';
    } else if (allCurrentOrCorrect) {
      newMessage = 'So far so good';
    } else {
      newMessage = 'Something is wrong';
    }
  
    setMessage(newMessage);
    setGridData(updatedGridData); 
    
    const tdElements = document.getElementsByTagName('td');
    for (let i = 0; i < tdElements.length; i++) {
      const td = tdElements[i];
      const row = parseInt(td.getAttribute('id').split('-')[1]);
      const col = parseInt(td.getAttribute('id').split('-')[2]);
      const square = gridData.rows[row][col];
      if (showIncorrectSquares && square.currentState !== square.correctState && square.currentState !== square.originalState) {
        td.style.border = '5px solid red';
      } else {
        td.style.border = '1px solid black';
      }
    }
  };
  
  const handleGridSizeChange = (e) => {
    const gridSize = e.target.value;
    fetchGrid(gridSize);
  }
  
  const handleShowIncorrectChange = (e) => {
    setShowIncorrectSquares(e.target.checked);
  }

  const handleSquareClick = (rowIndex, colIndex, currentState) => {
    const updatedGridData = { ...gridData };
  
    if (updatedGridData.rows[rowIndex][colIndex].canToggle) {
      updatedGridData.rows[rowIndex][colIndex].currentState = (currentState + 1) % colors.length;
      setGridData(updatedGridData);
    }
  };

  const renderGrid = () => {
    if (!gridData) {
      return <div>Loading...</div>;
    }
 
    return (
      <Grid
      gridState={gridData.rows}
      toggleSquare={handleSquareClick}
      />
    );
  };

  return (
    <div>
      <h1>Three In A Row</h1>
      <div>
        <label htmlFor="gridSizeSelect">Select Grid Size:</label>
        <select id="gridSizeSelect" onChange={handleGridSizeChange}>
          {Object.keys(gridSizes).map((size, i) => (
            <option key={i} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="showIncorrectCheckbox">
          Show Incorrect Squares:
        </label>
        <input
          id="showIncorrectCheckbox"
          type="checkbox"
          checked={showIncorrectSquares}
          onChange={handleShowIncorrectChange}
        />
      </div>
      {renderGrid()}
      <div>{message}</div>
      <button onClick={checkGameState}>Check Puzzle</button>
    </div>
  );
};

export default Game;                
