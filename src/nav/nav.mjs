import {homedir} from "node:os";
import {dirname} from "path";

let currentDir = homedir()

const printCurrentDir = () => {
    console.log(currentDir)
}

const up = () => {
    currentDir = dirname(currentDir)
}

export {printCurrentDir, up}