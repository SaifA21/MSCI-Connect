let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/addChat', (req,res) => {
	console.log(req.body.messagebody)
	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO Chats (content, author, class) VALUES
	 ("${req.body.messagebody}", (SELECT userID FROM t2nirmal.Users WHERE firebaseID = '${req.body.firebaseID}'), '${req.body.filter}');`


	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

	});

	connection.end();


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/addUser', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO Users (username, email, firebaseID) VALUES
	 ("${req.body.name}", '${req.body.email}', '${req.body.firebaseID}');`


	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

	});

	connection.end();


});

////////////////////////////////////////////////////////////////
app.post('/api/loadMessages', (req,res) => {

	let connection = mysql.createConnection(config);
	console.log("1121212"+req.method)
	console.log("1121212"+req.body.filter)
	let filter;
	if(req.body.filter!=""){
		filter=" where class = '"+req.body.filter+"'";
	}else{
		filter=""
	}

	let sort;
	if(req.body.sort=="0" || req.body.sort=="10"){
		sort = " order by chatID desc;"
	}else if(req.body.sort=="20"){
		sort = " order by chatID asc;"
	}else{
		sort = " order by chatID desc;"
	}

	let sql = `select  chatID, content, class, pinned, (select username from t2nirmal.Users where t2nirmal.Users.userID=t2nirmal.Chats.author) as username from t2nirmal.Chats ${filter} ${sort}`
	console.log(sql)
	/*
	if(req.body.filter=="" && req.body.sort==""){
		let sql = `select  chatID, content, class, pinned, (select username from t2nirmal.Users where t2nirmal.Users.userID=t2nirmal.Chats.author) as username from t2nirmal.Chats order by chatID desc;`
	}else if(req.body.filter!="" && req.body.sort==""){
		let sql = `select  chatID, content, class, pinned, (select username from t2nirmal.Users where t2nirmal.Users.userID=t2nirmal.Chats.author) as username from t2nirmal.Chats where filter=${req.body.filter} order by chatID desc;`
	}else if(req.body.filter=="" && req.body.sort!=""){
		let sql = `select  chatID, content, class, pinned, (select username from t2nirmal.Users where t2nirmal.Users.userID=t2nirmal.Chats.author) as username from t2nirmal.Chats where filter=${req.body.filter} and order by chatID desc;`
	}else{

	}
	*/

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
