import "./App.css";
import Board from "./components/Board/Board";
import GameProvider from "./context/GameContext/GameProvider";
import PlayerProvider from "./context/PlayerContext/PlayerProvider";

function App() {
  return (
    <main>
      <GameProvider>
        <PlayerProvider>
          <h1>Nine Men's Morris</h1>
          <Board />
        </PlayerProvider>
      </GameProvider>
    </main>
  );
}

export default App;
