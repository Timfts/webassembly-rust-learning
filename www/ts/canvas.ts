import { InitOutput, World } from "../wasm";
import { query } from "./utils";

interface IWorldOptions {
  cellSize: number;
  wasm: InitOutput;
}

export default function canvas(
  world: World,
  { cellSize, wasm }: IWorldOptions
) {
  // #region properties
  let currentWorldState = world;
  const canvasElement = query("#game-canvas") as HTMLCanvasElement;
  const ctx = canvasElement.getContext("2d");
  const worldWidth = currentWorldState.get_width();
  // #endregion

  // #region lifecicle
  (() => {
    _setupCanvas();
    _paint();
  })();
  // #endregion

  // #region methods
  function _setupCanvas() {
    canvasElement.height = worldWidth * cellSize;
    canvasElement.width = worldWidth * cellSize;
  }

  function _drawGrid() {
    ctx?.beginPath();
    for (let x = 0; x <= worldWidth; x++) {
      ctx?.moveTo(cellSize * x, 0);
      ctx?.lineTo(cellSize * x, worldWidth * cellSize);
    }

    for (let y = 0; y <= worldWidth; y++) {
      ctx?.moveTo(0, cellSize * y);
      ctx?.lineTo(worldWidth * cellSize, cellSize * y);
    }
    ctx?.stroke();
  }

  function _paint() {
    _drawGrid();
    _drawSnake();
    _drawReward();
  }

  function _drawSnake() {
    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      currentWorldState.get_snake_cells(),
      currentWorldState.get_snake_length()
    );

    snakeCells
      .slice()
      .reverse()
      .forEach((cellIdx, i) => {
        const col = cellIdx % worldWidth;
        const row = Math.floor(cellIdx / worldWidth);

        ctx!.fillStyle = i === snakeCells.length - 1 ? "#7878db" : "#000000";
        ctx?.beginPath();
        ctx?.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      });
    ctx?.stroke();
  }

  function _drawReward() {
    const idx = currentWorldState.get_reward_cell();
    if (idx) {
      const col = idx % worldWidth;
      const row = Math.floor(idx / worldWidth);
      ctx?.beginPath();
      ctx!.fillStyle = "#FF0000";
      ctx?.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      ctx?.stroke();
    }
    if (idx === 1000) {
      alert("you won");
    }
  }

  // #endregion

  return {
    updateWorld(world: World) {
      ctx?.clearRect(0, 0, canvasElement.width, canvasElement.height);
      currentWorldState = world;
      _paint();
    },
  };
}
