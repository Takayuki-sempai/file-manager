import {printCurrentDir, up} from "./nav/nav.mjs";

const exit = (commandArgs) => {
    if(commandArgs.size > 1) throw new Error("Command '.error' shouldn't contain any arguments")
    process.exit(0)
}

const onUserInput = (chunk) => {
    const chunkStringified = chunk.toString().trim();
    const commandArgs = chunkStringified.split(" ");
    const command = commandArgs[0];
    try {
        switch (command) {
            case '.exit':
                exit(commandArgs)
                break;
            case "up":
                up()
                break;
        }
    } catch (e) {
        console.log(e)
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