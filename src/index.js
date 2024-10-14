import {printCurrentDir} from "./nav/nav.mjs";
import {onUserInput} from "./controller/controller.mjs";

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