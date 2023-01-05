// wasm has a text format and a binay format, coverter:
// https://webassembly.github.io/wabt/demo/wat2wasm/

/*

Sum two numbers (webAssembly text format)
 
(module
  (func $sum (param $a i32) (param $b i32) (result i32)
  	local.get $a
    local.get $b
    i32.add
  )
  (export "sum" (func $sum))
)

 */

// ------ create the same web assembly code above but as byte array

const hexByteArray = [
  0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x07, 0x01, 0x60, 0x02,
  0x7f, 0x7f, 0x01, 0x7f, 0x03, 0x02, 0x01, 0x00, 0x07, 0x07, 0x01, 0x03, 0x73,
  0x75, 0x6d, 0x00, 0x00, 0x0a, 0x09, 0x01, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01,
  0x6a, 0x0b, 0x00, 0x18, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x01, 0x06, 0x01, 0x00,
  0x03, 0x73, 0x75, 0x6d, 0x02, 0x09, 0x01, 0x00, 0x02, 0x00, 0x01, 0x61, 0x01,
  0x01, 0x62,
];
const decimalByteArray = hexByteArray.map((hexItem) => parseInt(`${hexItem}`));
const byteArray = new Int8Array(hexByteArray);

// -------- running bytecode in webassembly

async function init() {
  const wasm = await WebAssembly.instantiate(byteArray.buffer);
  const sumFunction = wasm.instance.exports.sum as any;
  const result = sumFunction(2, 3);
  console.log(result);
}

init();

// --------- importing from file

/* async function init() {
  const file = await fetch("operation.wasm");
  const binArray = await file.arrayBuffer();
  const wasm = await WebAssembly.instantiate(binArray);
  const sumFunction = wasm.instance.exports.sum as any;
  console.log(sumFunction(10, 10));
}

init(); */

/* debugger; */
