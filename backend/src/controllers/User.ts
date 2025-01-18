import { User } from "../db/entities";
export async function findUserByNickname(nickname: string) {
  return await User.findOne({ where: { nickname }, relations: { place: true } });
}

export async function stateUserPlace(nickname: string) {
  const user = await findUserByNickname(nickname);
  if (!user) {
    return `No one is called ${nickname}.`;
  }
  return `${nickname} is from ${user.place.placeName}.`;
}
