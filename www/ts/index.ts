import init, { plus, minus } from "../wasm";


init().then(() => {
  const value = plus(3, 7.5);
  console.log(value)

  console.log(minus(5, 3))
})