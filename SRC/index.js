const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');
var Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");

//init
const app = express();
require('./lib/passport');

//configuraciones
app.set('port', 8888);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

MomentHandler.registerHelpers(Handlebars);
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'hola',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


//Variables Globales
app.use((req,res,next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});


//Rutas
app.use(require('./routes'));
app.use(require('./routes/authtentication'));
app.use('/horarios',require('./routes/horarios'));
app.use('/inscripcion',require('./routes/inscripcion'));
app.use('/asistencia',require('./routes/asistencia'));
app.use('/materias',require('./routes/materias'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto ', app.get('port'));
});

