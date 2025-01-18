import "dotenv/config";
import "reflect-metadata";

import dataSource from "./db/dataSource";

import express from "express";

import { stateUserPlace } from "./controllers/User";
import HelloWorldRouter from "./routes/HelloWorld";

(async function () {
  await dataSource.initialize();
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", async (req, res) => {
    res.send("hello");
  });

  app.get("/greet", async (req, res) => {
    res.send(await stateUserPlace(req.query.nickname?.toString() || ""));
  });

  app.use(HelloWorldRouter);

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
  });
})();
