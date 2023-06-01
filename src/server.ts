import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('Connected to database');

        app.listen(config.port, () => {
            console.log(`Application is listening on port ${config.port}`)
        })

    } catch (e) {
        console.log('failed to connect to database', e)
    }
}

main();