import { app } from "./app";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Promise.resolve().then(async () => {
    await app.start();
    await app.processCommand(...process.argv.slice(2));
    await app.stop();
    console.log("done");
});
