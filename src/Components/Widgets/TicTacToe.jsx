import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti"; // Import Confetti for a win celebration
import "../../Xox.css"; // Assuming your CSS already exists

const playerId = "player_123"; // Example player ID

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [winningPoints, setWinningPoints] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false); // To trigger confetti

  // Function to update player's coins
  const updateCoins = async (goldIncrease, diamondIncrease) => {
    try {
      // Get the current gold and diamonds first
      const goldResponse = await axios.get(`http://localhost:3000/api/getGoldCoins/${playerId}`);
      const diamondResponse = await axios.get(`http://localhost:3000/api/getDiamonds/${playerId}`);

      const newGold = goldResponse.data.gold_coins + goldIncrease;
      const newDiamonds = diamondResponse.data.diamonds + diamondIncrease;

      await axios.put(`http://localhost:3000/api/updateGoldCoins/${playerId}`, { gold_coins: newGold });
      await axios.put(`http://localhost:3000/api/updateDiamonds/${playerId}`, { diamonds: newDiamonds });

      setWinningPoints({ gold: goldIncrease, diamonds: diamondIncrease });
      setMessage(`🎉 You won! Earned ${goldIncrease} gold and ${diamondIncrease} diamonds.`);
      setShowConfetti(true); // Trigger confetti animation
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  useEffect(() => {
    if (currentPlayer === "O" && !gameOver) {
      setTimeout(() => computerMove(), 500);
    }
  }, [currentPlayer, gameOver]);

  const handleCellClick = (index) => {
    if (gameOver || board[index] !== "" || currentPlayer !== "X") {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    if (checkWinner(updatedBoard)) {
      setMessage(`${currentPlayer} wins!`);
      setGameOver(true);
      updateCoins(100, 2); // Add 100 gold and 2 diamonds to the player
    } else if (checkDraw(updatedBoard)) {
      setMessage("It's a draw!");
      setGameOver(true);
    } else {
      setCurrentPlayer("O");
    }
  };

  const computerMove = () => {
    const availableCells = board
      .map((cell, index) => (cell === "" ? index : null))
      .filter((index) => index !== null);

    if (availableCells.length > 0) {
      const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
      const updatedBoard = [...board];
      updatedBoard[randomCell] = "O";

      setBoard(updatedBoard);

      if (checkWinner(updatedBoard)) {
        setMessage("You lost! O wins! 😢");
        setGameOver(true);
        setShowConfetti(false); // Stop confetti for loss
        setWinningPoints(null); // No points for the player if they lose
      } else if (checkDraw(updatedBoard)) {
        setMessage("It's a draw!");
        setGameOver(true);
      } else {
        setCurrentPlayer("X");
      }
    }
  };

  const checkWinner = (board) => {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        highlightWinner([a, b, c]);
        return true;
      }
    }

    return false;
  };

  const highlightWinner = (indices) => {
    const cells = document.querySelectorAll(".cell");
    indices.forEach((index) => {
      cells[index].style.backgroundColor = "#8bc34a";
    });
  };

  const checkDraw = (board) => {
    return board.every((cell) => cell !== "");
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameOver(false);
    setMessage("");
    setWinningPoints(null); // Reset winning points message
    setShowConfetti(false); // Stop confetti
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => (cell.style.backgroundColor = ""));
  };

  return (
    <div id="make-center">
      {/* Confetti component, shown only if the player wins */}
      {showConfetti && <Confetti />}
      <div id="game-board" className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div id="game-over-message">
        {message && <p className="animated-message">{message}</p>}
        {winningPoints && (
          <p className="win-points">
            💰 You earned {winningPoints.gold} gold and {winningPoints.diamonds} diamonds! 💎
          </p>
        )}
      </div>
      {gameOver && (
        <button id="restart-button" onClick={restartGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
