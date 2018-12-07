const express = require('express');
const app = express();
const session = require('express-session');
const setupPassport = require('./passport');
const bodyParser = require('body-parser');
const router = require('./router')(express);
const https = require('https');
const fs = require('fs');
const port = process.env.PORT || 8080;

const options = {
    cert: fs.readFileSync('./localhost.crt'),
     key: fs.readFileSync('./localhost.key')
};

app.use(session({
    secret: 'supersecret',
    // what do these do? - receive deprecated undefined message without
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public')); // express will serve this directory holding our stylesheet etc (ours static files)
// bodyParser must be configured in-order to get bcrypt user login to work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

setupPassport(app);

app.use('/', router);

// we now want to implement https certificates
// app.listen(port);
https.createServer(options, app).listen(port);

console.log('listening on port ', port);