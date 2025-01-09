import React, { useState } from 'react';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleStartGame = (name1, name2) => {
    setPlayer1(name1);
    setPlayer2(name2);
    setGameStarted(true);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('Tie');
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStarted(false); // Go back to player name entry screen
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };
  

  return (
    <div className={`game`}>
      <h1>Tic Tac Toe</h1>
      
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      {!gameStarted ? (
        <div className="start-game">
          <h2>Enter Player Names</h2>
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <button
            onClick={() => handleStartGame(player1, player2)}
            disabled={!player1 || !player2}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="board">
            {board.map((cell, index) => (
              <div
                key={index}
                className="cell"
                onClick={() => handleClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
          {winner && (
            <div className="status">
              {winner === 'Tie' ? 'It\'s a tie!' : `Winner: ${winner === 'X' ? player1 : player2}`}
            </div>
          )}
          {!winner && (
            <div className="status">
              It's {isXNext ? `${player1}'s turn (X)` : `${player2}'s turn (O)`}
            </div>
          )}
          <button className="restart-btn" onClick={handleRestart}>
            Restart
          </button>
        </>
      )}
    </div>
  );
};

export default App;
