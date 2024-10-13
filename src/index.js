import { homedir } from "node:os"

const currentDir = homedir()

const printCurrentDirectory = () => {
    console.log(currentDir)
}

const onUserInput = (chunk) => {
    const chunkStringified = chunk.toString().trim();
    switch (chunkStringified) {
        case '.exit':
            process.exit(0)
    }
    printCurrentDirectory();
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
    printCurrentDirectory();
    process.stdin.on('data', onUserInput);
}

await start()