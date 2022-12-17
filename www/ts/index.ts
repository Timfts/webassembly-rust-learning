import "./misc/base-tutorial";

import init, {plus, minus, do_something} from "../wasm";

async function start() {
  await init();
  console.log(plus(3, 7.5));
  console.log(minus(5, 3));
  /* do_something("lala") */
}

start();
