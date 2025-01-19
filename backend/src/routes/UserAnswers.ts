import { Router } from "express";
import { applyRoute } from "./applyRoute";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";
import { setUserAnswer } from "../controllers/User";

const router = Router();

applyRoute(router, Routes.UserAnswers.setUserAnswerRoute).use(async (body) => {
  const result = await setUserAnswer(body.answer, body.questionID, body.userID, body.isOverride);
  if (result.errorCode) {
    throw new ResponseError(404, result.errorCode, result.message);
  }
  return { success: true };
});

export default router;
