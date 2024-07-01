import GameContext from "./GameContext";
import usePlayerTurn from "../../hooks/usePlayerTurn";
import usePlayerPieces from "../../hooks/usePlayerPieces";

export default function GameProvider({ children }) {
  const { playerTurn, nextPlayerTurn } = usePlayerTurn(); // Corrected to include destructuring
  const { playerPieces, addPlayerPiece, getPlayerPieceEle, findPlayerPiece } =
    usePlayerPieces();

  return (
    <GameContext.Provider
      value={{
        playerTurn,
        nextPlayerTurn,
        playerPieces,
        addPlayerPiece,
        getPlayerPieceEle,
        findPlayerPiece,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
