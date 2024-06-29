import clsx from "clsx";
import styles from "./PlayerPiece.module.css";
export default function PlayerPiece({ player = "player-two" }) {
  const pieceStyles = clsx(styles.playerPiece, {
    [styles.player1]: player === "player-one",
    [styles.player2]: player === "player-two",
  });

  return <div className={pieceStyles}></div>;
}
