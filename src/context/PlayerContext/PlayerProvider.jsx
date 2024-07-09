// Manages player states, including turns and pieces.
import React from "react";
import PlayerContext from "./PlayerContext";
import usePieces from "../../hooks/usePieces";
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
  const { addPiece, getPieceEle, findPiece } = usePieces();

  // Exported actions for components to dispatch
  const nextPlayerTurn = () => dispatch({ type: "NEXT_TURN" });

  const addPlayerPiece = (playerTurn, rowIndex, cellIndex) => {
    const piece = `${rowIndex},${cellIndex},${playerTurn}`;
    dispatch({ type: "ADD_PIECE", piece });
    addPiece(playerTurn, rowIndex, cellIndex);
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
