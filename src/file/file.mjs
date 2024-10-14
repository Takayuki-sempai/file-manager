import fs from "fs";
import {toAbsolutePath} from "../nav/nav.mjs";
import {OperationError} from "../error/error.mjs";
import {pipeline} from "node:stream/promises";

const cat = async (args) => {
    if (args.length !== 2) throw new Error()
    try {
        const file = toAbsolutePath(args[1])
        const rs = fs.createReadStream(file);
        await pipeline(rs, process.stdout, { end: false })
    } catch (e) {
        throw new OperationError()
    }
}

export {cat}