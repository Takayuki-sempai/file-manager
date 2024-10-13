const start = async () => {
    const usernameArg = process.argv.find((arg) => arg.startsWith("--username"));
    if(!usernameArg) throw new Error("No username argument provided. Please pass your username in arguments like '--username=your_username'");
    const username = usernameArg.slice(11);
    if(!username) throw new Error("Wrong username argument format. Please pass your username in arguments like '--username=your_username'");
    console.log(`Welcome to the File Manager, ${username}!`);
}

await start()