/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Direction {
  Up,
  Right,
  Down,
  Left,
}
/**
*/
export enum GameStatus {
  Won,
  Lost,
  Played,
}
/**
*/
export class World {
  free(): void;
/**
* @param {number | undefined} width
* @param {number | undefined} snake_idx
* @returns {World}
*/
  static new(width?: number, snake_idx?: number): World;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  reward_cell(): number;
/**
* @returns {number}
*/
  snake_head_index(): number;
/**
* @param {number} direction
*/
  change_snake_direction(direction: number): void;
/**
* @returns {number}
*/
  snake_cells(): number;
/**
* @returns {number}
*/
  snake_length(): number;
/**
*/
  update(): void;
/**
*/
  start_game(): void;
/**
* @returns {number | undefined}
*/
  game_status(): number | undefined;
/**
* @returns {string}
*/
  game_status_text(): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_world_free: (a: number) => void;
  readonly world_new: (a: number, b: number, c: number, d: number) => number;
  readonly world_width: (a: number) => number;
  readonly world_reward_cell: (a: number) => number;
  readonly world_snake_head_index: (a: number) => number;
  readonly world_change_snake_direction: (a: number, b: number) => void;
  readonly world_snake_cells: (a: number) => number;
  readonly world_snake_length: (a: number) => number;
  readonly world_update: (a: number) => void;
  readonly world_start_game: (a: number) => void;
  readonly world_game_status: (a: number) => number;
  readonly world_game_status_text: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
