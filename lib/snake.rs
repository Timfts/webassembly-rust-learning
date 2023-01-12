use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Up,
    Right,
    Down,
    Left,
}

#[derive(Clone, Copy)]
pub struct SnakeCell(pub usize);

pub struct Snake {
    pub body: Vec<SnakeCell>,
    pub direction: Direction,
}

impl Snake {
    pub fn new(spawn_index: usize, size: usize) -> Snake {
        let body: Vec<SnakeCell> = (0..size)
            .map(|size| SnakeCell(spawn_index - size))
            .collect();

        Snake {
            body,
            direction: Direction::Right,
        }
    }
}