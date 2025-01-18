import "dotenv/config";
import "reflect-metadata";

import dataSource from "./db/dataSource";

import express from "express";
import cors from "cors";

import HelloWorldRouter from "./routes/HelloWorld";
import UserSettingsRouter from "./routes/UserSettings";

(async function () {
  await dataSource.initialize();
  const app = express();

  const FRONTEND_URL = process.env.FRONTEND_URL;
  if (!FRONTEND_URL) {
    throw new Error("process.env.FRONTEND_URL is not set");
  }

  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", async (req, res) => {
    res.send("hello");
  });

  app.use(HelloWorldRouter);
  app.use(UserSettingsRouter);

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
  });
})();
