const start = async () => {
    const username = process.argv.find((arg) => arg.startsWith("--username"))?.slice(11) || "Anonymous"
    console.log(`Welcome to the File Manager, ${username}!`);
}

await start()