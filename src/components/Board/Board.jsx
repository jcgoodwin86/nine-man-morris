import React from "react";
import styles from "./Board.module.css"; // Ensure your CSS module is correctly configured
import PlayerContext from "../../context/PlayerContext/PlayerContext";
import PhaseContext from "../../context/PhaseContext/PhaseContext";

const generateInitialBoard = () => {
  const template = `
      P H H H H H P H H H H H P
      V B B B B B V B B B B B V
      V B P H H H P H H H P B V
      V B V B B B V B B B V B V
      V B V B P H P H P B V B V
      V B V B V B B B V B V B V
      P H P H P B B B P H P H P
      V B V B V B B B V B V B V
      V B V B P H P H P B V B V
      V B V B B B V B B B V B V
      V B P H H H P H H H P B V
      V B B B B B V B B B B B V
      P H H H H H P H H H H H P
    `;

  const rows = template
    .trim()
    .split("\n")
    .map((row) => row.trim().split(" "));
  return rows;
};

export default function Board() {
  const initialBoard = generateInitialBoard();
  const [board] = React.useState(initialBoard);
  const {
    playerTurn,
    nextPlayerTurn,
    playerPieces,
    addPlayerPiece,
    getPieceEle,
    findPiece,
  } = React.useContext(PlayerContext);
  const { phase1, checkPhaseOne } = React.useContext(PhaseContext);

  React.useEffect(() => {
    // Checks if phase1 is completed
    if (playerPieces.size === 18 && !phase1.completed) {
      checkPhaseOne(playerPieces);
    }
  }, [playerPieces, checkPhaseOne, phase1]);

  const handleCellClick = (rowIndex, cellIndex) => {
    // Ensure the cell clicked is a "P"
    if (board[rowIndex][cellIndex] === "P") {
      addPlayerPiece(playerTurn, rowIndex, cellIndex);
      nextPlayerTurn();
    }
  };

  const boardElement = board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      const key = `${rowIndex}-${cellIndex}`;

      const isPlayerPiece = findPiece(rowIndex, cellIndex);

      if (isPlayerPiece) {
        const [, , player] = isPlayerPiece.split(",");
        return getPieceEle(Number(player), key);
      }

      switch (cell) {
        case "H":
          return <div className={styles.horizontal} key={key}></div>;
        case "V":
          return <div className={styles.vertical} key={key}></div>;
        case "P":
          return (
            <div
              className={styles.piece}
              key={key}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            ></div>
          );
        default:
          return <div className={styles.cell} key={key}></div>;
      }
    });
  });

  return <section className={styles.board}>{boardElement}</section>;
}
