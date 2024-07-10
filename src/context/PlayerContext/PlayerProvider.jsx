// Manages player states, including turns and pieces.
import React from "react";
import PlayerContext from "./PlayerContext";
import PlayerPiece from "../../components/PlayerPiece/PlayerPiece";
import PhaseContext from "../PhaseContext/PhaseContext";

const playerReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_TURN":
      return { ...state, playerTurn: state.playerTurn === 1 ? 2 : 1 };
    case "ADD_PIECE": {
      const updatedPieces = new Set(state.playerPieces);
      updatedPieces.add(action.piece);
      return { ...state, playerPieces: updatedPieces };
    }
    case "REMOVE_PIECE": {
      const updatedPieces = new Set(state.playerPieces);
      updatedPieces.delete(action.pieceAtCell);
      return { ...state, playerPieces: updatedPieces };
    }
    default:
      return state;
  }
};

export default function PlayerProvider({ children }) {
  const initialState = {
    playerTurn: 1,
    playerPieces: new Set(),
  };
  const { checkPhaseOne } = React.useContext(PhaseContext);
  const [state, dispatch] = React.useReducer(playerReducer, initialState);

  const addPiece = (playerTurn, rowIndex, cellIndex) => {
    const piece = `${rowIndex},${cellIndex},${playerTurn}`;
    // Max of 18 pieces. Each player has 9 pieces
    if (state.playerPieces.size < 18) {
      dispatch({ type: "ADD_PIECE", piece });
    }
  };

  // Exported actions for components to dispatch
  const nextPlayerTurn = () => dispatch({ type: "NEXT_TURN" });

  const addPlayerPiece = (playerTurn, rowIndex, cellIndex) => {
    addPiece(playerTurn, rowIndex, cellIndex);
  };

  const removePlayerPiece = (pieceAtCell) => {
    dispatch({ type: "REMOVE_PIECE", pieceAtCell });
  };

  const getPieceEle = (pieceAtCell, handlePieceClick) => {
    const [, , player] = pieceAtCell.split(",");
    return (
      <PlayerPiece
        player={player === "1" ? "player-one" : "player-two"}
        key={pieceAtCell}
        handlePieceClick={handlePieceClick}
        pieceAtCell={pieceAtCell}
      />
    );
  };

  const findPiece = (rowIndex, cellIndex) => {
    const hasPiece = Array.from(state.playerPieces).find((piece) => {
      const [pieceRow, pieceCol] = piece.split(",").map(Number);
      return pieceRow === rowIndex && pieceCol === cellIndex;
    });

    return hasPiece;
  };

  // useEffect to call checkPhaseOne whenever playerPieces change
  React.useEffect(() => {
    checkPhaseOne(state.playerPieces);
  }, [state.playerPieces, checkPhaseOne]);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        nextPlayerTurn,
        addPlayerPiece,
        getPieceEle,
        findPiece,
        removePlayerPiece,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
