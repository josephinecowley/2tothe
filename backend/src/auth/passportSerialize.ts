import passport from "passport";
import { User } from "../db/entities/User";
import { NewUser } from "../db/entities/NewUser";
import "./extendExpress";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = (await User.findOne({ where: { id } })) || (await NewUser.findOne({ where: { id } }));
    done(null, user);
  } catch (err) {
    done(err);
  }
});
