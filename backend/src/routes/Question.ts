import { Router } from "express";
import { applyRoute } from "./applyRoute";
import * as Question from "../controllers/Question";
import { ErrorCode, ResponseError, Routes } from "@2tothe/shared";

const router = Router();

applyRoute(router, Routes.Question.getMostRecentQuestionForPlaceRoute).use(async (body) => {
  const result = await Question.getMostRecentQuestionForPlace(body.placeID);
  if (result.errorCode) {
    throw new ResponseError(404, result.errorCode, result.message);
  }
  return { questionID: result.mostRecentQuestionID };
});

applyRoute(router, Routes.Question.getSomeAnswerableQuestionsForUserRoute).use(async (body) => {
  const result = await Question.getSomeAnswerableQuestionsForUser(body.userID, body.count);
  if (result.errorCode) {
    throw new ResponseError(404, result.errorCode, result.message);
  }
  return { questions: result.questions };
});

export default router;
