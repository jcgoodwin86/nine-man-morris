import React from "react";

const startingPhases = {
  phase1: {
    completed: false,
  },
};

export default function useGamePhases() {
  const [gamePhases, setGamePhases] = React.useState(startingPhases);

  function phase1Check(playerPieces) {
    if (playerPieces.size === 18) {
      const updatedPhases = { ...gamePhases };
      updatedPhases.phase1.completed = true;
      setGamePhases(updatedPhases);
    }
  }

  return { gamePhases, phase1Check };
}
