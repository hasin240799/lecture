const express = require('express');
const app = express();
const sequelize = require('./config/database');
const User = require('./models/User')(sequelize);
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());
app.use(flash());

const secretKey = '31aa242da19199e28b1fdeba71c5854ef260161064ea176772953f3912d89659013bcb';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:secretKey, // Replace with your actual secret key
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await User.findByPk(jwt_payload.sub);
    console.log(jwt_payload.sub)
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));
app.use((req, res, next) => {
  console.log(req.headers); // Log request headers
  next();
});



// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lectures', require('./routes/lectureRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


