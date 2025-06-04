import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Square = memo(function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
});

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
  onClick: PropTypes.func.isRequired
};

const Board = memo(function Board({ squares, onSquareClick }) {
  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => onSquareClick(i)} />;
  };

  return (
    <div className="board">
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
});

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])).isRequired,
  onSquareClick: PropTypes.func.isRequired
};

export default Board; 