import init, { World, Direction, GameStatus } from "../wasm";
import { random } from "../externals";

export default async function app() {
  const wasm = await init();

  const CELL_SIZE = 20;
  const WORLD_WIDTH = 10;
  const SNAKE_SPAWN_IDX = random(WORLD_WIDTH * WORLD_WIDTH);

  const myWorld = World.new(WORLD_WIDTH, SNAKE_SPAWN_IDX);
  const worldWidth = myWorld.width();

  /*   const snakeCellPtr = myWorld.snake_cells();
  const snakeLength = myWorld.snake_length();
  const snakeCells = new Uint32Array(
    wasm.memory.buffer,
    snakeCellPtr,
    snakeLength
  );

  console.log(snakeCells); */

  const startBtn = document.querySelector(".start-btn") as HTMLButtonElement;
  const gameStatus = document.querySelector(".action-box__status-value");
  const points = document.querySelector(".action-box__points-value");
  startBtn.onclick = () => {
    const status = myWorld.game_status();

    if (!status) {
      myWorld.start_game();
      play();
    } else {
      location.reload();
    }
  };
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  canvas.height = worldWidth * CELL_SIZE;
  canvas.width = worldWidth * CELL_SIZE;

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        myWorld.change_snake_direction(Direction.Up);
        break;
      case "ArrowDown":
        myWorld.change_snake_direction(Direction.Down);
        break;
      case "ArrowLeft":
        myWorld.change_snake_direction(Direction.Left);
        break;
      case "ArrowRight":
        myWorld.change_snake_direction(Direction.Right);
        break;
    }
  });

  function drawWorld() {
    ctx?.beginPath();

    for (let x = 0; x <= worldWidth; x++) {
      ctx?.moveTo(CELL_SIZE * x, 0);
      ctx?.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE);
    }

    for (let y = 0; y <= worldWidth; y++) {
      ctx?.moveTo(0, CELL_SIZE * y);
      ctx?.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * y);
    }
    ctx?.stroke();
  }

  function drawReward() {
    const idx = myWorld.reward_cell();

    if (idx) {
      const col = idx % worldWidth;
      const row = Math.floor(idx / worldWidth);
      ctx?.beginPath();
      ctx!.fillStyle = "#FF0000";
      ctx?.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx?.stroke();
    }

    if (idx === 1000) {
      alert("you won");
    }
  }

  function drawSnake() {
    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      myWorld.snake_cells(),
      myWorld.snake_length()
    );

    snakeCells
      .slice()
      .reverse()
      .forEach((cellIdx, i) => {
        const col = cellIdx % worldWidth;
        const row = Math.floor(cellIdx / worldWidth);

        ctx!.fillStyle = i === snakeCells.length - 1 ? "#7878db" : "#000000";
        ctx?.beginPath();
        ctx?.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });
    ctx?.stroke();
  }

  function drawGameStatus() {
    gameStatus!.textContent = myWorld.game_status_text();
    points!.textContent = String(myWorld.points());
  }

  function paint() {
    drawWorld();
    drawSnake();
    drawReward();
    drawGameStatus();
  }

  function play() {
    const status = myWorld.game_status();

    if (status === GameStatus.Won || status === GameStatus.Lost) {
      return;
    }

    const framesPerSecond = 3;
    setTimeout(() => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      myWorld.update();
      paint();
      requestAnimationFrame(play);
    }, 1000 / framesPerSecond);
  }

  paint();
}
