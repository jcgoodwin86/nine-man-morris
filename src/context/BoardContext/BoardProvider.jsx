// Manages the game board's state, like the initialization of the board and handling clicks.
import React from "react";
import BoardContext from "./BoardContext";
import PlayerContext from "../PlayerContext/PlayerContext";
import generateInitialBoard from "../../utils/boardGenerator";

export default function BoardProvider({ children }) {
  const { addPlayerPiece, playerTurn, nextPlayerTurn, getPieceEle, findPiece } =
    React.useContext(PlayerContext);

  const [gameBoard] = React.useState(generateInitialBoard);

  const handleCellClick = React.useCallback(
    (rowIndex, cellIndex) => {
      if (gameBoard[rowIndex][cellIndex] === "P") {
        addPlayerPiece(playerTurn, rowIndex, cellIndex);
        nextPlayerTurn();
      }
    },
    [gameBoard, addPlayerPiece, playerTurn, nextPlayerTurn],
  );

  const value = {
    gameBoard,
    handleCellClick,
    getPieceEle,
    findPiece,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
