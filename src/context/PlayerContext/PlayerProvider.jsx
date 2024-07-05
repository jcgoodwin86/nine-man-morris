// Manages player states, including turns and pieces.
import React from "react";
import PlayerContext from "./PlayerContext";
import usePieces from "../../hooks/usePieces";

const playerReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_TURN":
      return { ...state, playerTurn: state.playerTurn === 1 ? 2 : 1 };
    case "SET_PIECES":
      return { ...state, playerPieces: action.pieces };
    default:
      return state;
  }
};

export default function PlayerProvider({ children }) {
  const initialState = {
    playerTurn: 1,
    playerPieces: new Set(),
  };

  const [state, dispatch] = React.useReducer(playerReducer, initialState);
  const { pieces, addPiece, getPieceEle, findPiece } = usePieces();

  // Exported actions for components to dispatch
  const nextPlayerTurn = () => dispatch({ type: "NEXT_TURN" });
  const addPlayerPiece = (playerTurn, rowIndex, cellIndex) => {
    addPiece(playerTurn, rowIndex, cellIndex);
    dispatch({ type: "SET_PIECES", pieces: pieces });
  };

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        nextPlayerTurn,
        addPlayerPiece,
        getPieceEle,
        findPiece,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
