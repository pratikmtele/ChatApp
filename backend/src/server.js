import { app } from "./app.js";
import dotenv from "dotenv";
import dbConfig from "./db/dbConfig.js";
import setupSocketServer from "./socket.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8001;

dbConfig().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  setupSocketServer(server);
});
