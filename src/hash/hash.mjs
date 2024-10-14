import {OperationError} from "../error/error.mjs";
import fs from "fs";
import {toAbsolutePath} from "../nav/nav.mjs";
import {createHash} from "crypto";
import {pipeline} from "node:stream/promises";

const hash = async (args) => {
    if (args.length !== 2) throw new Error()
    try {
        const rs = fs.createReadStream(toAbsolutePath(args[1]));
        const hash = await createHash("sha256");
        await pipeline(rs, hash.setEncoding("hex"), process.stdout, { end: false })
        console.log()
    } catch (e) {
        throw new OperationError()
    }
}

export {hash}