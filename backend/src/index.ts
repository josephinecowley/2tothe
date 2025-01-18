import "dotenv/config";
import "reflect-metadata";

import dataSource from "./db/dataSource";

import express from "express";

import { stateUserPlace } from "./controllers/User";

(async function () {
  await dataSource.initialize();
  const app = express();

  app.get("/", async (req, res) => {
    res.send("hello");
  });

  app.get("/greet", async (req, res) => {
    res.send(await stateUserPlace(req.query.nickname?.toString() || ""));
  });

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
  });
})();
