struct SnakeCell(usize);

pub struct Snake {
    pub body: Vec<SnakeCell>,
}

impl Snake {
    pub fn new(spawn_index: usize) -> Snake {
        Snake {
            body: vec![SnakeCell(spawn_index)],
        }
    }
}