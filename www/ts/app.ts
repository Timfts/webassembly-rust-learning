import init, { World, Direction, GameStatus } from "../wasm";
import { random } from "../externals";
import { query } from "./utils";
import canvas from "./canvas";


const CELL_SIZE = 20;
const WORLD_WIDTH = 5;
const SNAKE_SPAWN_IDX = random(WORLD_WIDTH * WORLD_WIDTH);
const FRAMES_PER_SECOND = 3;

export default async function App() {
  // #region properties
  const wasm = await init();
  const gameStatus = query(".action-box__status-value");
  const points = query(".action-box__points-value");
  const startBtn = query(".start-btn") as HTMLButtonElement;
  const worldEngine = World.new(WORLD_WIDTH, SNAKE_SPAWN_IDX);
  const view = canvas(worldEngine, { cellSize: CELL_SIZE, wasm });
  // #endregion

  // #region lifecycle
  (() => {
    startBtn.addEventListener("click", prepareGameStart);
    document.addEventListener("keydown", handleKeydown);
  })();
  // #endregion

  // #region methods
  function prepareGameStart() {
    const gameIsStopped = !worldEngine.get_game_status();
    if (gameIsStopped) {
      worldEngine.start_game();
      startGameLoop();
    } else {
      location.reload();
    }
  }

  function startGameLoop() {
    const status = worldEngine.get_game_status();
    if (status === GameStatus.Won || status === GameStatus.Lost) {
      return;
    }
    setTimeout(() => {
      worldEngine.update();
      view.updateWorld(worldEngine);
      updateGameStatus();
      requestAnimationFrame(startGameLoop);
    }, 1000 / FRAMES_PER_SECOND);
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.code) {
      case "ArrowUp":
        worldEngine.change_snake_direction(Direction.Up);
        break;
      case "ArrowDown":
        worldEngine.change_snake_direction(Direction.Down);
        break;
      case "ArrowLeft":
        worldEngine.change_snake_direction(Direction.Left);
        break;
      case "ArrowRight":
        worldEngine.change_snake_direction(Direction.Right);
        break;
    }
  }

  function updateGameStatus() {
    gameStatus!.textContent = worldEngine.get_game_status_text();
    points!.textContent = String(worldEngine.get_points());
  }

  // #endregion
}
