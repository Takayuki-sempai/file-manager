import {cd, ls, printCurrentDir, up} from "../nav/nav.mjs";
import {add, cat, cp, mv, rm, rn} from "../file/file.mjs";
import {os} from "../os/os.mjs";
import {hash} from "../hash/hash.mjs";
import {compress, decompress} from "../zip/brotli.mjs";
import {OperationError} from "../error/error.mjs";

const exit = (commandArgs) => {
    if(commandArgs.size > 1) throw new Error()
    process.exit(0)
}

const commandHandlers = {
    ".exit": exit,
    "up": up,
    "cd": cd,
    "ls": ls,
    "cat": cat,
    "add": add,
    "rn": rn,
    "cp": cp,
    "mv": mv,
    "rm": rm,
    "os": os,
    "hash": hash,
    "compress": compress,
    "decompress": decompress
}

const onUserInput = async (chunk) => {
    const chunkStringified = chunk.toString().trim();
    const commandArgs = chunkStringified.split(" ");
    const command = commandArgs[0];
    try {
        const handler = commandHandlers[command]
        await handler(commandArgs)
    } catch (e) {
        if(e instanceof OperationError) {
            console.log("Operation failed")
        } else{
            console.log("Invalid input")
        }
    }
    printCurrentDir();
}

export {onUserInput}