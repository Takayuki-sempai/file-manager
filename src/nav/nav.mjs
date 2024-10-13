import {homedir} from "node:os";
import {dirname, isAbsolute, join} from "path";
import {readdir} from "node:fs/promises";

let currentDir = homedir()

const printCurrentDir = () => {
    console.log(currentDir)
}

const up = () => {
    currentDir = dirname(currentDir)
}

const cd = async (args) => {
    if (args.length !== 2) throw new Error()
    const newDir = args[1]
    const fullNewDir = isAbsolute(newDir) ? newDir : join(currentDir, newDir)
    await readdir(fullNewDir).then(() => currentDir = fullNewDir)
}

export {printCurrentDir, up, cd}