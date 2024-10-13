import {homedir} from "node:os";

const currentDir = homedir()

const printCurrentDir = () => {
    console.log(currentDir)
}

export {printCurrentDir}