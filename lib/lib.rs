
use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn plus(a: f32, b:f32) -> f32{
    print!("lala");
    a + b
}


#[wasm_bindgen]
pub fn minus(a: f32, b:f32) -> f32 {
    a - b
}