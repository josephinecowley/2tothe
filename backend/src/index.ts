import "dotenv/config";
import "reflect-metadata";

import dataSource from "./db/dataSource";

import express from "express";
import cors from "cors";

import { stateUserPlace } from "./controllers/User";
import HelloWorldRouter from "./routes/HelloWorld";
import SetNewPlaceRouter from "./routes/UserSettings";

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

  app.get("/greet", async (req, res) => {
    res.send(await stateUserPlace(req.query.nickname?.toString() || ""));
  });

  app.use(HelloWorldRouter);
  app.use(SetNewPlaceRouter);

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
  });
})();
