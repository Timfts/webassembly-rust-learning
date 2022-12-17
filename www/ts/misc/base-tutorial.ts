console.log("base tutorial")

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