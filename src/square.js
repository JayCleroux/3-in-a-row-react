import React from 'react';

const Square = ({ id, currentState, canToggle, onClick }) => {
  // Define square style object
  const squareStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: currentState,
    border: '1px solid black',
    cursor: canToggle ? 'pointer' : 'default',
  };

  // Render square component with defined style, id, and onClick event handler
  return (
    <td
      id={id} // Set the id prop to the id attribute of td element
      style={squareStyle} // Apply squareStyle to the style prop of td element
      onClick={onClick} // Attach onClick event handler to td element
    />
  );
};

export default Square;
