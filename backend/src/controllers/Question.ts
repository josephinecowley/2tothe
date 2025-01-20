import { ErrorCode } from "@2tothe/shared";
import { Place, ScheduledQuestion, Question, User } from "../db/entities";

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
      message: `No past questions found for place ${placeID}.`,
    };
  }

  return { mostRecentQuestionID: mostRecentScheduledQuestion.questionID };
}

export async function getSomeAnswerableQuestionsForUser(userID: User["id"], count: number) {
  const now = new Date();
  const user = await User.findOne({ where: { id: userID }, relations: { place: true } });
  if (!user) {
    return {
      errorCode: ErrorCode.NotFound,
      message: `No user found with id: ${userID}.`,
    };
  }

  const placeID = user.place.id;

  const answerableQuestions = await Question.createQueryBuilder("question")
    // Filter out questions not for user's place
    .leftJoin("question.whitelistedPlaces", "whitelisted_place")
    .where("(whitelisted_place.id IS NULL OR whitelisted_place.id = :placeID)", { placeID })

    // Find all questions which have not been answered by user
    .leftJoin("question.userAnswers", "ua_for_user", "ua_for_user.userId = :userID", { userID })
    .andWhere("ua_for_user.id IS NULL")

    // Filter for questions which are timeless OR are in the past of the user's place
    .leftJoin("question.scheduledQuestions", "sq", "sq.placeID = :placeID", { placeID })
    .andWhere("(sq.dateTime <= :now OR question.timeless IS TRUE)", { now })

    .take(count)
    .getMany();

  return answerableQuestions;
}
