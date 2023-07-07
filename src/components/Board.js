import React, { useState } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [isXNext, setIsXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (isXNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    if (isXNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  return (
    <div>
      <div data-testid="status" className="status">
        {status}
      </div>
      <div data-testid="board-row" className="board-row">
        <button
          className="square"
          data-testid="square-0"
          value={squares[0]}
          onClick={() => handleClick(0)}
        >
          {squares[0]}
        </button>
        <button
          className="square"
          data-testid="square-1"
          value={squares[1]}
          onClick={() => handleClick(1)}
        >
          {squares[1]}
        </button>
        <button
          className="square"
          data-testid="square-2"
          value={squares[2]}
          onClick={() => handleClick(2)}
        >
          {squares[2]}
        </button>
      </div>
      <div data-testid="board-row" className="board-row">
        <button
          className="square"
          data-testid="square-3"
          value={squares[3]}
          onClick={() => handleClick(3)}
        >
          {squares[3]}
        </button>
        <button
          className="square"
          data-testid="square-4"
          value={squares[4]}
          onClick={() => handleClick(4)}
        >
          {squares[4]}
        </button>
        <button
          className="square"
          data-testid="square-5"
          value={squares[5]}
          onClick={() => handleClick(5)}
        >
          {squares[5]}
        </button>
      </div>
      <div data-testid="board-row" className="board-row">
        <button
          className="square"
          data-testid="square-6"
          value={squares[6]}
          onClick={() => handleClick(6)}
        >
          {squares[6]}
        </button>
        <button
          className="square"
          data-testid="square-7"
          value={squares[7]}
          onClick={() => handleClick(7)}
        >
          {squares[7]}
        </button>
        <button
          className="square"
          data-testid="square-8"
          value={squares[8]}
          onClick={() => handleClick(8)}
        >
          {squares[8]}
        </button>
      </div>
    </div>
  );
}