import GameContext from "./GameContext";
import useGamePhases from "../../hooks/useGamePhases";

export default function GameProvider({ children }) {
  const { gamePhases, phase1Check } = useGamePhases();

  return (
    <GameContext.Provider
      value={{
        gamePhases,
        phase1Check,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
