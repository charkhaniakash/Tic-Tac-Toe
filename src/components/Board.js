import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Square = memo(function Square({ value, onClick, index, isClickable }) {
  const position = `Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`;

  return (
    <button
      className={`square ${value ? `square-${value.toLowerCase()}` : ''}`}
      onClick={onClick}
      disabled={!isClickable || Boolean(value)}
      aria-label={`${position}${value ? `, ${value}` : ', empty'}`}
    >
      <span aria-hidden="true">{value}</span>
    </button>
  );
});

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isClickable: PropTypes.bool.isRequired
};

const Board = memo(function Board({ squares, onSquareClick, isClickable }) {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        index={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        isClickable={isClickable}
      />
    );
  };

  return (
    <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row" role="row">
          {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
});

Board.defaultProps = {
  isClickable: true
};

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])).isRequired,
  onSquareClick: PropTypes.func.isRequired
};

export default Board; 
