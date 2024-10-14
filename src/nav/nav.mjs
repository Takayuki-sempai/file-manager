import {homedir} from "node:os";
import {dirname, isAbsolute, join} from "path";
import {readdir} from "node:fs/promises";
import {OperationError} from "../error/error.mjs";

let currentDir = homedir()

const printCurrentDir = () => {
    console.log(currentDir)
}

const up = (args) => {
    if (args.length !== 1) throw new Error()
    currentDir = dirname(currentDir)
}

const toAbsolutePath = (filepath) => isAbsolute(filepath) ? filepath : join(currentDir, filepath)

const cd = async (args) => {
    if (args.length !== 2) throw new Error()
    const newDir = args[1]
    try {
        const fullNewDir = toAbsolutePath(newDir)
        await readdir(fullNewDir).then(() => currentDir = fullNewDir)
    } catch (e) {
        throw new OperationError()
    }
}

const createCell = (data, cellLength) => {
    const spaces = cellLength - data.length
    const leftSpaces = Math.floor(spaces / 2)
    const rightSpaces = spaces - leftSpaces
    return " ".repeat(leftSpaces) + data + " ".repeat(rightSpaces)
}

const ls = async (args) => {
    if (args.length !== 1) throw new Error()
    try {
        const files = await readdir(currentDir, {withFileTypes: true})
        let maxFileNameLength = Math.max(4, ...files.map(file => file.name.length))
        console.log(`┌─────────┬─${"─".repeat(maxFileNameLength)}─┬───────────┐`)
        console.log(`│ (index) │ ${createCell("Name", maxFileNameLength)} │   Type    │`)
        files.forEach((file, index) => {
            console.log(`├─────────┼─${"─".repeat(maxFileNameLength)}─┼───────────┤`)
            const indexCell = createCell(index.toString(), 7)
            const nameCell = createCell(file.name, maxFileNameLength)
            const typeCell = file.isFile() ? "  file   " : "directory"
            console.log(`│ ${indexCell} │ ${nameCell} │ ${typeCell} │`)
        })
        console.log(`└─────────┴─${"─".repeat(maxFileNameLength)}─┴───────────┘`)
    } catch (e) {
        throw new OperationError()
    }
}

export {printCurrentDir, up, cd, ls, toAbsolutePath}