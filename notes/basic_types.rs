fn _types() {
    let _num = 10; // i32 -> signed interger of 32 bits (max 2^32 -1 or 4294967295)
                   // signed can hold positive and negative values

    let _small_num: u8 = 2; // u8 -> unsigned interger of 8 bits (max 2^8 -1 or 255)
    let _small_num_2: i8 = 3; // i8 -> signed interger of 8 bits (from -128 to 127)

    let _sys_num: isize = 10; // operating system related

    let _tup = (1, "cebola", 2.22);
    let (_a, _b, _c) = _tup; // destructuring

    let _x = [1, 2, 3, 4];
    let [_aa,_bb,_cc, _dd] = _x;
}

fn hof(fun: fn(i32) -> i32, val: i32) -> i32 {
    fun(val)
}
fn main() {
    let times_two = |num: i32| -> i32 {
        let new_value = num * 2;
        new_value
    };

    let mut my_hello = "potato";
    println!("{}", my_hello);
    my_hello = "carrot";
    println!("{}", my_hello);
    let _age_two = 20;
    let potato = hof(times_two, 5);

    println!("{}", potato)
}
