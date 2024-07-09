import "./App.css";
import Board from "./components/Board/Board";
import PlayerProvider from "./context/PlayerContext/PlayerProvider";
import PhaseProvider from "./context/PhaseContext/PhaseProvider";
import BoardProvider from "./context/BoardContext/BoardProvider";

function App() {
  return (
    <main>
      <BoardProvider>
        <PhaseProvider>
          <PlayerProvider>
            <h1>Nine Men's Morris</h1>
            <Board />
          </PlayerProvider>
        </PhaseProvider>
      </BoardProvider>
    </main>
  );
}

export default App;
