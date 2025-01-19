import "dotenv/config";
import "reflect-metadata";
import session from "express-session";
import passport from "passport";

import dataSource from "./db/dataSource";

import express from "express";
import cors from "cors";

import { useSmsStrategy } from "./auth/smsStrategy";
import "./auth/passportSerialize";

import HelloWorldRouter from "./routes/HelloWorld";
import UserSettingsRouter from "./routes/UserSettings";
import AuthRouter from "./routes/Auth";
import UserAnswersRouter from "./routes/UserAnswers";
import QuestionRouter from "./routes/Question";

(async function () {
  await dataSource.initialize();

  useSmsStrategy();

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

  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/", async (req, res) => {
    res.send("hello");
  });

  app.use(HelloWorldRouter);
  app.use(UserSettingsRouter);
  app.use(AuthRouter);
  app.use(UserAnswersRouter);
  app.use(QuestionRouter);

  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
  });
})();
