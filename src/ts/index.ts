//@ts-ignore
import init from "../wasm/sum.wasm?init";

init().then((instance) => {
  console.log(instance);
});
