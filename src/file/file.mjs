import fs from "fs";
import {toAbsolutePath} from "../nav/nav.mjs";
import {OperationError} from "../error/error.mjs";
import {pipeline} from "node:stream/promises";
import {writeFile} from "node:fs/promises";
import {rename as renameFile} from "fs/promises";
import {dirname, join} from "path";

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

const add = async (args) => {
    if (args.length !== 2) throw new Error()
    try {
        await writeFile(toAbsolutePath(args[1]), "", {encoding: "utf8", flag: "wx"});
    } catch (err) {
        throw new OperationError()
    }
}

const rn = async (args) => {
    if (args.length !== 3) throw new Error()
    try {
        const source = toAbsolutePath(args[1])
        const fileDir = dirname(source)
        const dist = join(fileDir, args[2])
        await renameFile(source, dist);
    } catch (err) {
        throw new OperationError()
    }
}

export {cat, add, rn}