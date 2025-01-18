import { ErrorCode } from "@2tothe/shared";
import { Place, User } from "../db/entities";
export async function findUserByNickname(nickname: string) {
  return await User.findOne({ where: { nickname }, relations: { place: true } });
}

export async function stateUserPlace(nickname: User["nickname"]) {
  const user = await findUserByNickname(nickname);
  if (!user) {
    return `No one is called ${nickname}.`;
  }
  return `${nickname} is from ${user.place.placeName}.`;
}

export async function setUserPlace(userID: User["id"], newPlaceID: Place["id"]) {
  const user = await User.findOne({ where: { id: userID }, relations: { place: true } });
  if (!user) {
    return {
      success: false,
      errorCode: ErrorCode.NotFound,
      message: `No one has the user id: ${userID}.`,
    };
  }

  const newPlace = await Place.findOne({ where: { id: newPlaceID } });
  if (!newPlace) {
    return {
      success: false,
      errorCode: ErrorCode.NotFound,
      message: `No place has the place id: ${newPlaceID}.`,
    };
  }

  user.place = newPlace;
  await user.save();

  return {
    succes: true,
    message: `User place was updated to ${newPlace.placeName}`,
  };
}
