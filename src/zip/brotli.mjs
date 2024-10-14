import {toAbsolutePath} from "../nav/nav.mjs";
import {join} from "path";
import {access} from "node:fs/promises";
import fs from "fs";
import {pipeline} from "node:stream/promises";
import {OperationError} from "../error/error.mjs";
import {createBrotliCompress, createBrotliDecompress} from "node:zlib";

const runCommand = async (args, transform) => {
    if (args.length !== 3) throw new Error()
    try {
        const source = toAbsolutePath(args[1])
        const dist = join(toAbsolutePath(args[2]))
        await access(source)
        const rs = fs.createReadStream(source);
        const ws = fs.createWriteStream(dist);
        await pipeline(rs, transform, ws)
    } catch (err) {
        throw new OperationError()
    }
}

const compress = async (args) => await runCommand(args, createBrotliCompress());
const decompress = async (args) => await runCommand(args, createBrotliDecompress());

export {compress, decompress}
