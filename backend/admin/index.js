const express = require("express");
const app = express();
const db = require("./connections/db")
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash  = require('req-flash');
var oldInput = require('old-input');
var cors = require('cors')
require("dotenv").config();
var cron = require('node-cron');
var request = require('request');
const PORT = process.env.PORT

app.use(express.json())



app.use(cors())
app.use(cookieParser())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(flash());
app.use(oldInput);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(up.array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
// app.use()

app.use(function(req, res, next) {
	res.locals.user = req.session.user_data;
	next();
});

app.use('/', require("./admin/routers"))
app.use('/', require("./api/routers"))


// cron.schedule("* * * * * * ", function () {
//     request('http://localhost:5000/api/add-rent-report-history', function (err, res, body) {
//       console.log(body,"llllllllllllllll");
//       if (err || res.statusCode !== 200) {
//         // throw new Error(err);
//         console.log(err);
//       }

//       console.log("hello");
//     });
//   })
  
app.listen((PORT), (err) => {
    if (err) {
        throw err
    } else {
        console.log(`server is woring port:${PORT}`);
        console.log(`api url: http://localhost:${PORT}`);
    }
})


