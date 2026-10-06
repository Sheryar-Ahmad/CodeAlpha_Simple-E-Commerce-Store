import { connectDatabase } from "./config/database.js";
import { createApp } from "./app.js";

const PORT = process.env.PORT || 5001;

async function startServer() {
  await connectDatabase();

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Simple Store API running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the API server:", error.message);
  process.exit(1);
});
