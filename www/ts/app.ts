import init, { World, Direction } from "../wasm";

export default async function app() {
  const wasm = await init();

  const CELL_SIZE = 50;
  const WORLD_WIDTH = 8;
  const SNAKE_SPAWN_IDX = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);

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

  function drawSnake() {
    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      myWorld.snake_cells(),
      myWorld.snake_length()
    );

    snakeCells.forEach((cellIdx, i) => {
      const col = cellIdx % worldWidth;
      const row = Math.floor(cellIdx / worldWidth);


      ctx!.fillStyle = i === 0 ? "#7878db" : "#000000"
      ctx?.beginPath();
      ctx?.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
    ctx?.stroke();
  }

  function paint() {
    drawWorld();
    drawSnake();
  }

  function setUpdate() {
    const framesPerSecond = 3;
    setTimeout(() => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      myWorld.update();
      paint();
      requestAnimationFrame(setUpdate);
    }, 1000 / framesPerSecond);
  }

  paint();
  setUpdate();
}
