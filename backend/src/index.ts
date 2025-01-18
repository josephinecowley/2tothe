import "dotenv/config";

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
