use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Up,
    Right,
    Down,
    Left,
}

struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    fn new(spawn_index: usize) -> Snake {
        Snake {
            body: vec![SnakeCell(spawn_index)],
            direction: Direction::Right,
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

    pub fn change_snake_direction(&mut self, direction: Direction){
        self.snake.direction = direction;
    }

    pub fn update(&mut self) {
        let snake_idx = self.snake_head_index();

        let (row, col) = self.index_to_cell(snake_idx);
        let (row, col) = match self.snake.direction {
            Direction::Right => (row, (col + 1) % self.width),
            Direction::Left => (row, (col - 1) % self.width),
            Direction::Up => ((row - 1) % self.width, col),
            Direction::Down => ((row + 1) % self.width, col),
        };

        let next_idx = self.cell_to_index(row, col);
        self.set_snake_head(next_idx);
    }

    fn set_snake_head(&mut self, idx: usize) {
        self.snake.body[0].0 = idx;
    }

    fn cell_to_index(&self, row: usize, col: usize) -> usize {
        (row * self.width) + col
    }

    fn index_to_cell(&self, idx: usize) -> (usize, usize) {
        (idx / self.width, idx % self.width)
    }
}
