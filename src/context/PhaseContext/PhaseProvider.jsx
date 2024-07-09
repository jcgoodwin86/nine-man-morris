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
  const [state, dispatch] = React.useReducer(PhaseReducer, startingPhases);

  const phaseOneCheck = React.useCallback(
    (playerPieces) => {
      const isPhaseOneCompleted = playerPieces.size === 18;
      if (state.phase1.completed !== isPhaseOneCompleted) {
        dispatch({
          type: "UPDATE_PHASES",
          payload: { phase1: { completed: isPhaseOneCompleted } },
        });
      }
    },
    [state.phase1.completed], // only re-create this function if `state.phase1.completed` changes
  );

  return (
    <PhaseContext.Provider value={{ ...state, checkPhaseOne: phaseOneCheck }}>
      {children}
    </PhaseContext.Provider>
  );
}
