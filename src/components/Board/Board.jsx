import React from "react";
import styles from "./Board.module.css";
import BoardContext from "../../context/BoardContext/BoardContext";

export default function Board() {
  const { gameBoard, handleCellClick, getPieceEle, findPiece } =
    React.useContext(BoardContext);

  const boardElement = gameBoard?.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      const key = `${rowIndex}-${cellIndex}`;
      const pieceAtCell = findPiece(rowIndex, cellIndex);

      if (pieceAtCell) {
        return getPieceEle(pieceAtCell);
      }

      switch (cell) {
        case "H":
          return <div className={styles.horizontal} key={key}></div>;
        case "V":
          return <div className={styles.vertical} key={key}></div>;
        case "P":
          return (
            <div
              className={styles.piece}
              key={key}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            ></div>
          );
        default:
          return <div className={styles.cell} key={key}></div>;
      }
    }),
  );

  return <section className={styles.board}>{boardElement}</section>;
}
