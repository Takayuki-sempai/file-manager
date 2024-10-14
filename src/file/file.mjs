import fs from "fs";
import {toAbsolutePath} from "../nav/nav.mjs";
import {OperationError} from "../error/error.mjs";
import {pipeline} from "node:stream/promises";
import {writeFile, rm as remove, rename as renameFile, access} from "node:fs/promises";
import {dirname, join} from "path";
import {basename as winBasename} from "path/win32";
import {basename as posixBasename} from "path/posix";

const isWindows = process.platform === "win32";

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

const cp = async (args) => {
    if (args.length !== 3) throw new Error()
    try {
        const source = toAbsolutePath(args[1])
        const fileName = isWindows ? winBasename(source) : posixBasename(source)
        const dist = join(toAbsolutePath(args[2]), fileName)
        await access(source)
        const rs = fs.createReadStream(source);
        const ws = fs.createWriteStream(dist);
        await pipeline(rs, ws)
    } catch (err) {
        throw new OperationError()
    }
}

const mv = async (args) => {
    if (args.length !== 3) throw new Error()
    try {
        await cp(args)
        await rm(args.slice(0, 2))
    } catch (err) {
        throw new OperationError()
    }
}

const rm = async (args) => {
    if (args.length !== 2) throw new Error()
    try {
        await remove(toAbsolutePath(args[1]));
    } catch (err) {
        throw new OperationError()
    }
}

export {cat, add, rn, cp, mv, rm}