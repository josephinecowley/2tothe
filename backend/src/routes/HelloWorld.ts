import { Router } from "express";
import { applyRoute } from "./applyRoute";
import { Routes } from "@2tothe/shared";

const router = Router();

applyRoute(router, Routes.HelloWorld.helloWorldRoute).use(async (body) => {
  return { message: `Hello, ${body.name}!` };
});

export default router;
