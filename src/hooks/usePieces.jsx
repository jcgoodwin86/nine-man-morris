import React from "react";
import PlayerPiece from "../components/PlayerPiece/PlayerPiece";

export default function usePieces() {
  const [pieces, setPieces] = React.useState(new Set());

  function addPiece(playerTurn, rowIndex, cellIndex) {
    setPieces((prevPieces) => {
      const newPiece = `${rowIndex},${cellIndex},${playerTurn}`;
      const updatedPieces = new Set(prevPieces);

      // Max of 18 piece. Each player has 9 pieces
      if (updatedPieces.size < 18) {
        updatedPieces.add(newPiece);
      }

      return updatedPieces;
    });
  }

  function getPieceEle(player, key) {
    if (player === 1) {
      return <PlayerPiece player="player-one" key={key} />;
    } else if (player === 2) {
      return <PlayerPiece player="player-two" key={key} />;
    }
  }

  function findPiece(rowIndex, cellIndex) {
    const hasPiece = Array.from(pieces).find((piece) => {
      const [pieceRow, pieceCol] = piece.split(",").map(Number);
      return pieceRow === rowIndex && pieceCol === cellIndex;
    });

    return hasPiece;
  }

  return { pieces, addPiece, getPieceEle, findPiece };
}
