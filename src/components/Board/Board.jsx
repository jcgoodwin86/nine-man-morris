import React from "react";
import styles from "./Board.module.css";

const generateInitialBoard = () => {
  // P - piece, V - vertical, H - horizontal, B - blank
  const template = `
      P H H H H H P H H H H H P
      V B B B B B V B B B B B V
      V B P H H H P H H H P B V
      V B V B B B V B B B V B V
      V B V B P H P H P B V B V
      V B V B V B B B V B V B V
      P H P H P B B B P H P H P
      V B V B V B B B V B V B V
      V B V B P H P H P B V B V
      V B V B B B V B B B V B V
      V B P H H H P H H H P B V
      V B B B B B V B B B B B V
      P H H H H H P H H H H H P
    `;

  const rows = template
    .trim()
    .split("\n")
    .map((row) => row.trim().split(" "));
  return rows;
};

export default function Board() {
  const initialBoard = generateInitialBoard();
  const [board] = React.useState(initialBoard);

  const boardElement = board.map((row) => {
    return row.map((cell, cellIndex) => {
      switch (cell) {
        case "H":
          return <div className={styles.horizontal} key={cellIndex}></div>;
        case "V":
          return <div className={styles.vertical} key={cellIndex}></div>;
        case "P":
          return <div className={styles.piece} key={cellIndex}></div>;
        default:
          return <div className={styles.cell} key={cellIndex}></div>;
      }
    });
  });
  return <section className={styles.board}>{boardElement}</section>;
}
