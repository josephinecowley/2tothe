import passport from "passport";
import { User } from "../entities/User";
import "./extendExpress";
import { NewUser } from "../entities";

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
