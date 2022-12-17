import "./misc/base-tutorial";

import init, {World} from "../wasm";

async function start() {
  await init();

  const myWorld = World.new()
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement
  const ctx = canvas.getContext("2d")
  
  console.log(myWorld.width())
}

start();
