import {EOL, cpus, homedir, userInfo, arch} from "node:os";
import {OperationError} from "../error/error.mjs";


const cpusInfo = () => {
    const info = cpus()
    return {
        amount: info.length,
        extended: info.map((cpu) => ({model: cpu.model, clockRate: cpu.speed / 1000 + "GHz"}))
    }
}

const paramHandlers = {
    "--EOL": () => EOL,
    "--cpus": cpusInfo,
    "--homedir": homedir,
    "--username": userInfo().username,
    "--architecture": arch,
}

const os = async (args) => {
    if (args.length !== 2) throw new Error()
    const handler = paramHandlers[args[1]]
    if (!handler) throw new Error()
    try {
        console.log(handler())
    } catch (e) {
        throw new OperationError()
    }
}

export {os}