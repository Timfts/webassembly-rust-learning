import { random, log } from './snippets/snake-core-c500c7cb77b8028e/www/externals.js';

let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
*/
export const Direction = Object.freeze({ Up:0,"0":"Up",Right:1,"1":"Right",Down:2,"2":"Down",Left:3,"3":"Left", });
/**
*/
export const GameStatus = Object.freeze({ Won:0,"0":"Won",Lost:1,"1":"Lost",Played:2,"2":"Played", });
/**
*/
export class World {

    static __wrap(ptr) {
        const obj = Object.create(World.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @param {number | undefined} width
    * @param {number | undefined} snake_idx
    * @returns {World}
    */
    static new(width, snake_idx) {
        const ret = wasm.world_new(!isLikeNone(width), isLikeNone(width) ? 0 : width, !isLikeNone(snake_idx), isLikeNone(snake_idx) ? 0 : snake_idx);
        return World.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    get_width() {
        const ret = wasm.world_get_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number | undefined}
    */
    get_reward_cell() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_get_reward_cell(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    get_points() {
        const ret = wasm.world_get_points(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get_snake_head_index() {
        const ret = wasm.world_get_snake_head_index(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} direction
    */
    change_snake_direction(direction) {
        wasm.world_change_snake_direction(this.ptr, direction);
    }
    /**
    * @returns {number}
    */
    get_snake_cells() {
        const ret = wasm.world_get_snake_cells(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get_snake_length() {
        const ret = wasm.world_get_snake_length(this.ptr);
        return ret >>> 0;
    }
    /**
    */
    update() {
        wasm.world_update(this.ptr);
    }
    /**
    */
    start_game() {
        wasm.world_start_game(this.ptr);
    }
    /**
    * @returns {number | undefined}
    */
    get_game_status() {
        const ret = wasm.world_get_game_status(this.ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @returns {string}
    */
    get_game_status_text() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_get_game_status_text(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_random_06ff7eb101bdbf39 = function(arg0) {
        const ret = random(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_log_0f208c11010187ce = function(arg0, arg1) {
        try {
            log(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array();
    cachedUint8Memory0 = new Uint8Array();


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('index_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
