// Manages the game board's state, like the initialization of the board and handling clicks.
import React from "react";
import BoardContext from "./BoardContext";
import PlayerContext from "../PlayerContext/PlayerContext";
import PhaseContext from "../PhaseContext/PhaseContext";
import generateInitialBoard from "../../utils/boardGenerator";
import run from "../../utils/getMoveLocations";

function moveCheck(currentPiece, moveSpot) {
  const moves = run();
  const pieceLocation = currentPiece.slice(0, -2);
  const moveTo = moveSpot.slice(0, -2);
  const allowedMoves = moves[pieceLocation];

  return allowedMoves.includes(moveTo);
}

export default function BoardProvider({ children }) {
  const {
    addPlayerPiece,
    playerTurn,
    nextPlayerTurn,
    getPieceEle,
    findPiece,
    movePlayerPiece,
  } = React.useContext(PlayerContext);
  const { phaseState } = React.useContext(PhaseContext);
  const [gameBoard] = React.useState(generateInitialBoard);
  const [currentPiece, setCurrentPiece] = React.useState();

  const handlePieceClick = (pieceAtCell) => {
    const isCurrentPlayerPiece = pieceAtCell.at(-1) === String(playerTurn);

    if (phaseState.phase1.completed && isCurrentPlayerPiece) {
      if (currentPiece != null) {
        // This is to deselect current piece
        setCurrentPiece(() => null);
      } else {
        // Select piece user clicked
        setCurrentPiece(() => pieceAtCell);
      }
    }
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    if (!phaseState.phase1.completed) {
      addPlayerPiece(playerTurn, rowIndex, cellIndex);
      nextPlayerTurn();
    } else if (currentPiece) {
      const moveSpot = `${rowIndex},${cellIndex},${playerTurn}`;
      const canMove = moveCheck(currentPiece, moveSpot);
      if (canMove) {
        movePlayerPiece(currentPiece, moveSpot);
        setCurrentPiece(null);
      }
    }
  };

  const value = {
    gameBoard,
    handleCellClick,
    getPieceEle: (pieceAtCell) =>
      getPieceEle(pieceAtCell, handlePieceClick, currentPiece),
    findPiece,
    handlePieceClick,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
