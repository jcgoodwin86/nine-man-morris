import GameContext from "./GameContext";
import usePlayerTurn from "../../hooks/usePlayerTurn";

export default function GameProvider({ children }) {
  const playerTurn = usePlayerTurn();

  return (
    <GameContext.Provider value={playerTurn}>{children}</GameContext.Provider>
  );
}
