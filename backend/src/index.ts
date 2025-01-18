import "dotenv/config";
import "reflect-metadata";

import dataSource from "./db/dataSource";

import express from "express";

(async function () {
  await dataSource.initialize();
  const app = express();

  app.get("/", async (req, res) => {
    res.send("hello");
  });

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
  });
})();
