export interface IUserWithID {
  id: string;
}
declare global {
  namespace Express {
    interface User extends IUserWithID {}
  }
}
