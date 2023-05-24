import React from 'react';
import Square from './square'; 

const colors = ['gold', '#B366FF', 'white']; 

const Grid = ({ gridState, toggleSquare }) => {
  return (
    <table>
      <tbody>
        {gridState.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((square, colIndex) => (
              <Square
                key={colIndex} // Set the key prop to colIndex for unique key
                id={`square-${rowIndex}-${colIndex}`} // Set the id prop to a unique value based on row and col index
                currentState={colors[square.currentState]} // Set currentState prop with color based on square's currentState
                canToggle={true} 
                onClick={() => toggleSquare(rowIndex, colIndex, square.currentState)} 
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;

