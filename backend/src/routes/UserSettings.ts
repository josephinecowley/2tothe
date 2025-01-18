import { Router } from "express";
import { applyRoute } from "./applyRoute";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";
import { setUserPlace } from "../controllers/User";

const router = Router();

applyRoute(router, Routes.UserSettings.setUserPlaceRoute).use(async (body) => {
  const result = await setUserPlace(body.userID, body.newPlaceID);
  if (result.errorCode) {
    throw new ResponseError(404, result.errorCode, result.message);
  }
  return { success: true };
});

export default router;
