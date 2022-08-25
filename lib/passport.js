require('dotenv').config();
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Users } = require('../db/models');

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('secret-token'),
  secretOrKey: process.env.Secret_Token,
};

passport.use(
  new JwtStrategy(options, (payload, done) => {
    Users.findOne({ where: { userName: payload.userName } })
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passport;
