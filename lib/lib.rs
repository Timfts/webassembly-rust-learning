use wasm_bindgen::prelude::*;
mod snake;

use snake::{Direction, Snake, SnakeCell};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(module = "/www/externals.js")]
extern "C" {
    fn log_something();
    fn now() -> usize;
    fn random(max: usize) -> usize;
}

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub enum GameStatus {
    Won,
    Lost,
    Played,
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    snake: Snake,
    size: usize,
    next_cell: Option<SnakeCell>,
    reward_cell: Option<usize>,
    status: Option<GameStatus>,
    points: usize
}
#[wasm_bindgen]
impl World {
    pub fn new(width: Option<usize>, snake_idx: Option<usize>) -> World {
        let used_width = width.unwrap_or(8);
        let used_snake_idx = snake_idx.unwrap_or(0);
        let snake = Snake::new(used_snake_idx, 3);
        let size = used_width * used_width;

        return World {
            width: used_width,
            reward_cell: World::gen_reward_cell(size, &snake.body),
            snake,
            size,
            next_cell: None,
            status: None,
            points: 0
        };
    }

    fn gen_reward_cell(max: usize, snake_body: &Vec<SnakeCell>) -> Option<usize> {
        let mut reward_cell;

        loop {
            reward_cell = random(max);
            if !snake_body.contains(&SnakeCell(reward_cell)) {
                break;
            }
        }
        return Some(reward_cell);
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn reward_cell(&self) -> Option<usize> {
        self.reward_cell
    }

    pub fn points(&self) -> usize {
        self.points
    }

    pub fn snake_head_index(&self) -> usize {
        let first_cell = &self.snake.body[0];
        let first_cell_index = first_cell.0;
        return first_cell_index;
    }

    pub fn change_snake_direction(&mut self, direction: Direction) {
        let next_cell = self.gen_next_snake_cell(&direction);

        if self.snake.body[1].0 == next_cell.0 {
            return;
        }

        self.next_cell = Some(next_cell);
        self.snake.direction = direction;
    }

    // cannot return a reference to javascript because of borrowing rules
    // pub fn snake_cells(&self) -> Vec<SnakeCell>{
    //     self.snake.body
    // }

    pub fn snake_cells(&self) -> *const SnakeCell {
        self.snake.body.as_ptr()
    }

    pub fn snake_length(&self) -> usize {
        self.snake.body.len()
    }

    pub fn update(&mut self) {
        match self.status {
            Some(GameStatus::Played) => {
                let temp = self.snake.body.clone();

                match self.next_cell {
                    Some(cell) => {
                        self.snake.body[0] = cell;
                        self.next_cell = None;
                    }
                    None => {
                        self.snake.body[0] = self.gen_next_snake_cell(&self.snake.direction);
                    }
                }

                let len = self.snake.body.len();

                for i in 1..len {
                    self.snake.body[i] = SnakeCell(temp[i - 1].0)
                }

                if self.snake.body[1..self.snake_length()].contains(&self.snake.body[0]){
                    self.status = Some(GameStatus::Lost);
                }

                if self.reward_cell == Some(self.snake_head_index()) {
                    if (self.snake_length() < self.size) {
                        self.points += 1;
                        self.reward_cell = World::gen_reward_cell(self.size, &self.snake.body)
                    } else {
                        self.reward_cell = None;
                        self.status = Some(GameStatus::Won);
                    }
                    self.snake.body.push(SnakeCell(self.snake.body[1].0));
                }
            }
            _ => {}
        }
    }

    pub fn start_game(&mut self) {
        self.status = Some(GameStatus::Played);
    }

    pub fn game_status(&self) -> Option<GameStatus> {
        self.status
    }

    pub fn game_status_text(&self) -> String {
        match self.status {
            Some(GameStatus::Won) => String::from("You have won!!"),
            Some(GameStatus::Lost) => String::from("You have lost!!"),
            Some(GameStatus::Played) => String::from("Playing"),
            None => String::from("No Status"),
        }
    }

    fn gen_next_snake_cell(&self, direction: &Direction) -> SnakeCell {
        let snake_idx = self.snake_head_index();
        let row = snake_idx / self.width;

        return match direction {
            Direction::Right => {
                let treshold = (row + 1) * self.width;
                if snake_idx + 1 == treshold {
                    SnakeCell(treshold - self.width)
                } else {
                    SnakeCell(snake_idx + 1)
                }
            }
            Direction::Left => {
                let treshold = row * self.width;
                if snake_idx == treshold {
                    SnakeCell(treshold + (self.width - 1))
                } else {
                    SnakeCell(snake_idx - 1)
                }
            }
            Direction::Up => {
                let treshold = snake_idx - (row * self.width);
                if snake_idx == treshold {
                    SnakeCell((self.size - self.width) + treshold)
                } else {
                    SnakeCell(snake_idx - self.width)
                }
            }
            Direction::Down => {
                let treshold = snake_idx + ((self.width - row) * self.width);
                if snake_idx + self.width == treshold {
                    SnakeCell(treshold - ((row + 1) * self.width))
                } else {
                    SnakeCell(snake_idx + self.width)
                }
            }
        };
    }
}
