const onUserInput = (chunk) => {
    const chunkStringified = chunk.toString().trim();
    switch (chunkStringified) {
        case '.exit':
            process.exit(0)
    }
    console.log(chunkStringified);
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
    process.stdin.on('data', onUserInput);
}

await start()