require("dotenv").config();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
     
      /**
       * name : profile.displayName,
       * email : profile._json.email,
       * passwd : uuidv4()
       */
      try {
          let user = await User.findOne({ email: profile?._json?.email })
            .lean()
            .exec();
            // console.log(user);
          if(!user){
              user = await User.create({
                  name:profile.displayName,
                  email: profile._json.email,
                  password: uuidv4(),
                  roles:['customer']
              });
            }
            return cb(null, user);
      } catch (error) {
          console.error(error);
          return cb(error,null);
        //   return res.status(500).send(error);
      }
    //   console.log(profile._json.email);
    }
  )
);

module.exports = passport;
