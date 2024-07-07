import "./App.css";
import Board from "./components/Board/Board";
import PlayerProvider from "./context/PlayerContext/PlayerProvider";
import PhaseProvider from "./context/PhaseContext/PhaseProvider";

function App() {
  return (
    <main>
      <PlayerProvider>
        <PhaseProvider>
          <h1>Nine Men's Morris</h1>
          <Board />
        </PhaseProvider>
      </PlayerProvider>
    </main>
  );
}

export default App;
