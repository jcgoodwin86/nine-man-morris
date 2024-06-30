import "./App.css";
import Board from "./components/Board/Board";
import GameProvider from "./context/GameContext/GameProvider";

function App() {
  return (
    <main>
      <GameProvider>
        <h1>Nine Men's Morris</h1>
        <Board />
      </GameProvider>
    </main>
  );
}

export default App;
