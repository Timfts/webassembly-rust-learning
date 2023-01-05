
import init, { World } from "../wasm";


export default async function app(){
    await init();

    const CELL_SIZE = 10;
    const myWorld = World.new();
    const worldWidth = myWorld.width();
  
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
  
    canvas.height = worldWidth * CELL_SIZE;
    canvas.width = worldWidth * CELL_SIZE;
  
    function drawWorld() {
      ctx?.beginPath();
  
      for (let x = 0; x < worldWidth + 1; x++) {
        ctx?.moveTo(CELL_SIZE * x, 0);
        ctx?.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE);
      }
  
      for (let y = 0; y < worldWidth + 1; y++) {
        ctx?.moveTo(0, CELL_SIZE * y);
        ctx?.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * y);
      }
      ctx?.stroke();
    }
  
    drawWorld();
}