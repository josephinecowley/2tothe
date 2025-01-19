import { ErrorCode } from "@2tothe/shared";
import { Place, ScheduledQuestion, Question } from "../db/entities";

export async function getMostRecentQuestionForPlace(placeID: Place["id"]) {
  const now = new Date();
  const mostRecentScheduledQuestion = await ScheduledQuestion.createQueryBuilder("scheduledQuestion")
    .where("scheduledQuestion.placeID = :placeID", { placeID })
    .where("scheduledQuestion.dateTime <= :now", { now })
    .orderBy("scheduledQuestion.dateTime", "DESC")
    .getOne();

  if (!mostRecentScheduledQuestion) {
    return {
      errorCode: ErrorCode.NotFound,
      message: `No past questions found for place ${placeID}`,
    };
  }

  return { mostRecentQuestionID: mostRecentScheduledQuestion.questionID };
}
