var express = require("express");
var app=express();
var dbconfig=require("./db/dbconfig");
var bodyParser= require('body-parser');
var knex =require('knex')({
  	client: 'mysql',
	connection: {
	    host : 'localhost',
	    user : 'root',
	    password : '',
	    database : 'testdb'
	  }
	});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

var db=require("./db/db")(app,knex);

app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile)

app.set('views',__dirname+"/public/views");

app.get('/', function (req, res) {
  res.render('index.html')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})