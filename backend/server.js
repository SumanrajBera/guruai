import "dotenv/config";
import { app } from "./src/app.js";
import connectDB from "./src/config/database.js";
import { testAi } from "./src/services/ai.service.js";

// testAi()

connectDB()
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})