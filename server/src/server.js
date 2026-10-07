import { connectDatabase } from "./config/database.js";
import { createApp } from "./app.js";

const PORT = process.env.PORT || 5001;

async function startServer() {
  await connectDatabase();

  const app = createApp();

  if (!process.env.JWT_SECRET) throw new Error("Set JWT_SECRET in server/.env.");
  const server = app.listen(PORT, () => {
    console.log(`Simple Store API running on port ${PORT}`);
  });
  // Explain port conflicts instead of leaving an unhandled error in the terminal.
  server.on("error", (error) => {
    console.error(error.code === "EADDRINUSE"
      ? `Port ${PORT} is already in use. Stop the existing backend before starting another.`
      : error.message);
    process.exit(1);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the API server:", error.message);
  process.exit(1);
});
