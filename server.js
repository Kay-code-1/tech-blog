const path = require('path');
const express = require('express');
// Routes
const routes = require('./controllers');
// Sessions
const session = require('express-session');
// Handlebars
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Setup express app
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config');
// Session store using sequelize to store session data
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Default timeout 1 hour
const timeout = process.env.TIMEOUT || 3600;

// Set up session middleware
const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: timeout * 1000 }, 
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup request data parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set static content to the public foler
app.use(express.static(path.join(__dirname, 'public')));

// Setup routing middleware
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
