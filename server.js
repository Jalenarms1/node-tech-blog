// Place server code here
const exp = require("constants");
const express = require("express");
const sequelize = require('./config/connection')
const exphb = require("express-handlebars")

const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const routes = require("./controllers");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const hbs = exphb.create({helpers});


const options = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(options));




app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')))


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");



app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    })
})

