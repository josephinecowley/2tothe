import { Router } from "express";
import { applyRoute } from "./applyRoute";
import { Routes } from "@2tothe/shared";

const router = Router();

applyRoute(router, Routes.helloWorldRoute).use(async ({ name }) => {
  return { message: `Hello, ${name}!` };
});

export default router;
