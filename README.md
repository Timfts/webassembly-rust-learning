# Webassembly + Rust snake game

This project implements a simple Snake game based on the [Filip Jerga's webassembly + rust course](https://www.udemy.com/course/rust-webassembly-with-js-ts-the-practical-guide/).

It implements the game core/engine through webassembly code (compiled from rust code).

the game is available [here](https://timfts.github.io/webassembly-rust-learning/).

## Running the project locally

Make sure you have Node 16.x or higher and [Rust + Wasm Pack](https://rustwasm.github.io/docs/wasm-pack/quickstart.html) installed.

then run:

```shell
yarn

yarn dev:wasm
```