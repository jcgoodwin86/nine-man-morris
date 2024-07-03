import GameContext from "./GameContext";
import usePlayerTurn from "../../hooks/usePlayerTurn";
import usePlayerPieces from "../../hooks/usePlayerPieces";
import useGamePhases from "../../hooks/useGamePhases";

export default function GameProvider({ children }) {
  const { playerTurn, nextPlayerTurn } = usePlayerTurn(); // Corrected to include destructuring
  const { playerPieces, addPlayerPiece, getPlayerPieceEle, findPlayerPiece } =
    usePlayerPieces();
  const { gamePhases, phase1Check } = useGamePhases();

  return (
    <GameContext.Provider
      value={{
        playerTurn,
        nextPlayerTurn,
        playerPieces,
        addPlayerPiece,
        getPlayerPieceEle,
        findPlayerPiece,
        gamePhases,
        phase1Check,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
