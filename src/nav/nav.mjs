import {homedir} from "node:os";
import {dirname, isAbsolute, join} from "path";
import {readdir} from "node:fs/promises";

let currentDir = homedir()

const printCurrentDir = () => {
    console.log(currentDir)
}

const up = (args) => {
    if (args.length !== 1) throw new Error()
    currentDir = dirname(currentDir)
}

const cd = async (args) => {
    if (args.length !== 2) throw new Error()
    const newDir = args[1]
    const fullNewDir = isAbsolute(newDir) ? newDir : join(currentDir, newDir)
    await readdir(fullNewDir).then(() => currentDir = fullNewDir)
}

const createCell = (data, cellLength) => {
    const spaces = cellLength - data.length
    const leftSpaces = Math.floor(spaces / 2)
    const rightSpaces = spaces - leftSpaces
    return " ".repeat(leftSpaces) + data + " ".repeat(rightSpaces)
}

const ls = async (args) => {
    if (args.length !== 1) throw new Error()
    const files = await readdir(currentDir, {withFileTypes: true})
    const maxFileNameLength = Math.max(...files.map(file => file.name.length))
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
}

export {printCurrentDir, up, cd, ls}