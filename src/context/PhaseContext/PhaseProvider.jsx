import React from "react";
import PhaseContext from "./PhaseContext";

const startingPhases = {
  phase1: {
    completed: false,
  },
  phase2: {
    completed: false,
  },
};

const PhaseReducer = (phaseState, action) => {
  switch (action.type) {
    case "UPDATE_PHASES":
      // This action payload contains the entire gamePhases phaseState to update
      return { ...phaseState, ...action.payload };
    default:
      return phaseState;
  }
};

export default function PhaseProvider({ children }) {
  const [phaseState, dispatch] = React.useReducer(PhaseReducer, startingPhases);

  const phaseOneCheck = React.useCallback(
    (playerPieces) => {
      const isPhaseOneCompleted = playerPieces.size === 18;
      if (phaseState.phase1.completed !== isPhaseOneCompleted) {
        dispatch({
          type: "UPDATE_PHASES",
          payload: { phase1: { completed: isPhaseOneCompleted } },
        });
      }
    },
    [phaseState.phase1.completed],
  );

  return (
    <PhaseContext.Provider value={{ phaseState, checkPhaseOne: phaseOneCheck }}>
      {children}
    </PhaseContext.Provider>
  );
}
