
use wasm_bindgen::prelude::*;


#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[wasm_bindgen]
pub fn do_something(hehes: &str){
    alert(hehes);
}

#[wasm_bindgen]
pub fn plus(a: f32, b:f32) -> f32{
    print!("lala");
    a + b
}


#[wasm_bindgen]
pub fn minus(a: f32, b:f32) -> f32 {
    let _potato = 25;
    
    a - b
}


#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}