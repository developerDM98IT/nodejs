var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var db = require('./db');
var Router = require('./router/router.js');
var authRouter = require('./router/auth.js');
var cookieParser = require('cookie-parser');
var middleware = require('./middewares/auth.middleware.js');
var app = express();

var port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function(req,res){
	res.render('index',{
		name: 'students'	
	});
});	
app.use('/student',middleware.requireAuth, Router);
app.use('/auth', authRouter)
app.listen(port, function (){
	console.log('Server listening on port' + port);
})