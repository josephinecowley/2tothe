import { Router } from "express";
import { applyRoute } from "./applyRoute";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";

const router = Router();

applyRoute(router, Routes.HelloWorld.helloWorldRoute).use(async (body) => {
  // throw new ResponseError(403, ErrorCode.Test, "Gotcha!");
  return { message: `Hello, ${body.name}!` };
});

export default router;
