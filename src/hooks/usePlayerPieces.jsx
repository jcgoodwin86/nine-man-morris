import React from "react";
import PlayerPiece from "../components/PlayerPiece/PlayerPiece";

export default function usePlayerPieces() {
  const [playerPieces, setPlayerPieces] = React.useState(new Set());

  function addPlayerPiece(playerTurn, rowIndex, cellIndex) {
    setPlayerPieces((prevPieces) => {
      const newPiece = `${rowIndex},${cellIndex},${playerTurn}`;
      const updatedPieces = new Set(prevPieces);

      // Max of 18 piece. Each player has 9 pieces
      if (updatedPieces.size < 18) {
        updatedPieces.add(newPiece);
      }

      return updatedPieces;
    });
  }

  function getPlayerPieceEle(player, key) {
    if (player === 1) {
      return <PlayerPiece player="player-one" key={key} />;
    } else if (player === 2) {
      return <PlayerPiece player="player-two" key={key} />;
    }
  }

  function findPlayerPiece(rowIndex, cellIndex) {
    const hasPiece = Array.from(playerPieces).find((piece) => {
      const [pieceRow, pieceCol] = piece.split(",").map(Number);
      return pieceRow === rowIndex && pieceCol === cellIndex;
    });

    return hasPiece;
  }

  return { playerPieces, addPlayerPiece, getPlayerPieceEle, findPlayerPiece };
}
