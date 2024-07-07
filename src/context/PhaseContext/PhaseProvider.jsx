import React from "react";
import PhaseContext from "./PhaseContext";

const startingPhases = {
  phase1: {
    completed: false,
  },
};

const PhaseReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PHASES":
      // This action payload contains the entire gamePhases state to update
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default function PhaseProvider({ children }) {
  const [gamePhases, setGamePhases] = React.useState(startingPhases);
  const [state, dispatch] = React.useReducer(PhaseReducer, startingPhases);

  const phaseOneCheck = React.useCallback(
    (playerPieces) => {
      const isPhaseOneCompleted = playerPieces.size === 18;
      setGamePhases((currentPhases) => {
        const updatedPhases = {
          ...currentPhases,
          phase1: { ...currentPhases.phase1, completed: isPhaseOneCompleted },
        };
        // Directly dispatch here as we're managing everything within PhaseProvider
        dispatch({ type: "UPDATE_PHASES", payload: updatedPhases });
        return updatedPhases;
      });
    },
    [dispatch],
  );

  // Ensure any external changes to gamePhases update the reducer state
  React.useEffect(() => {
    dispatch({ type: "UPDATE_PHASES", payload: gamePhases });
  }, [gamePhases, dispatch]);

  return (
    <PhaseContext.Provider value={{ ...state, checkPhaseOne: phaseOneCheck }}>
      {children}
    </PhaseContext.Provider>
  );
}
