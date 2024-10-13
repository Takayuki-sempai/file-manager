import {printCurrentDir, up} from "./nav/nav.mjs";

const exit = (commandArgs) => {
    if(commandArgs.size > 1) throw new Error()
    process.exit(0)
}

const commandHandlers = {
    ".exit": exit,
    "up": up
}

const onUserInput = (chunk) => {
    const chunkStringified = chunk.toString().trim();
    const commandArgs = chunkStringified.split(" ");
    const command = commandArgs[0];
    try {
        const handler = commandHandlers[command]
        handler(commandArgs)
    } catch (e) {
        console.log("Invalid input")
    }
    printCurrentDir();
}

const start = async () => {
    const username = process.argv.find((arg) => arg.startsWith("--username"))?.slice(11) || "Anonymous"
    process.on('exit', (_) => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    });
    process.on("SIGINT", () => {
        process.exit();
    });
    console.log(`Welcome to the File Manager, ${username}!`);
    printCurrentDir();
    process.stdin.on('data', onUserInput);
}

await start()