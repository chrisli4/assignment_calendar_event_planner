//app.js

const express = require('express');
const app = express();

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Handlebars
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
	partialsDir: 'views/',
	defaultLayout: 'application'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Static Files
app.use(express.static(`${__dirname}/public`));

//Logging
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach((key) => {
    if (req[key]) {
      const capKey = key[0].toUpperCase() + key.substr(1);
      const value = JSON.stringify(req[key], null, 2);
      console.log(`${ capKey }: ${ value }`);
    }
  });
  next();
});

//Routes
const usersRoutes = require('./routers/users');
app.use('/', usersRoutes);

//Server
const env = require('./env');
app.listen(env.port, env.hostname, () => {
	console.log(`Server started at: ${ env.hostname }:${ env.port }`);
});

module.exports = app;


