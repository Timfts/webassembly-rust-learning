import init from "../wasm";

async function start() {
  const { plus, minus } = await init();
  console.log(plus(3, 7.5));
  console.log(minus(5, 3));
}


start()