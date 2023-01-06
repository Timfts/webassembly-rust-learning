use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>,
}

impl Snake {
    fn new(spawn_index: usize) -> Snake {
        Snake {
            body: vec![SnakeCell(spawn_index)],
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    snake: Snake,
    size: usize,
}
#[wasm_bindgen]
impl World {
    pub fn new(width: Option<usize>, snake_idx: Option<usize>) -> World {
        let used_width = width.unwrap_or(8);
        let used_snake_idx = snake_idx.unwrap_or(0);

        return World {
            width: used_width,
            snake: Snake::new(used_snake_idx),
            size: used_width * used_width,
        };
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_head_index(&self) -> usize {
        let first_cell = &self.snake.body[0];
        let first_cell_index = first_cell.0;
        return first_cell_index;
    }

    pub fn update(&mut self) {
        let snake_idx = self.snake_head_index();
        self.snake.body[0].0 = (snake_idx + 1) % self.size;
    }
}
