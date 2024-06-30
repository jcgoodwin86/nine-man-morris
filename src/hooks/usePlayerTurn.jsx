import React from "react";

export default function usePlayerTurn() {
  const [playerTurn, setPlayerTurn] = React.useState(1);

  const nextPlayerTurn = () => {
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };

  return { playerTurn, nextPlayerTurn };
}
