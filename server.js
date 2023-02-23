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

////////////////////////////////////////////////////////////////////////////////

app.post('/api/addChat', (req,res) => {
	//console.log(req.body.messagebody)
	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO Chats (content, author, class) VALUES
	 ("${req.body.messagebody}", (SELECT userID FROM sselvaka.Users WHERE firebaseID = '${req.body.firebaseID}'), '${req.body.filter}');`


	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

	});

	connection.end();


});


////////////////////////////////////////////////////////////////////////////////

app.post('/api/checkAdmin', (req,res) => {
	console.log("welwkere"+req.body.firebaseID)
	let connection = mysql.createConnection(config);
	let sql = `select admin from Users where firebaseID = '${req.body.firebaseID}';`
	console.log(sql)

	connection.query(sql,(error, results, fields) => {
		console.log(results)
		if (error){
			return console.error(error.message);
		}

		let string = JSON.stringify(results)
		//console.log(string)
		res.send({express: string})

	});

	connection.end();


});

/////////////////////////////////////////////////////////////////////////////////////
app.post('/api/addUpdate', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO NewsUpdates (title, content, author, class) VALUES
	 ("${req.body.updatetitle}","${req.body.updatebody}", (SELECT userID FROM sselvaka.Users WHERE firebaseID = '${req.body.firebaseID}'), '${req.body.filter}');`


	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({express: string})

	});

	connection.end();


});

/////////////////////////////////////////////////////////////////////////////////////

//THIS IS WHAT I AM LOOKING

app.post('/api/loadUpdates', (req,res) => {

	let connection = mysql.createConnection(config);

	let filter;
	if(req.body.mainPagefilter!=""){
		filter=" where class = '"+req.body.mainPagefilter+"'";
	}else{
		filter=""
	}

	
	let sql = `select  updateID, title, content, class, pinned, (select username from sselvaka.Users where sselvaka.Users.userID=sselvaka.NewsUpdates.author) as username from sselvaka.NewsUpdates ${filter} order by updateID desc;`
	console.log(sql);

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	connection.end();
});

/////////////////////////////////////////////////////////////////////////////////////

app.post('/api/loadPolls', (req,res) => {

	let connection = mysql.createConnection(config);

	let filter;
	if(req.body.filter!=""){
		filter=" where class = '"+req.body.filter+"'";
	}else{
		filter=""
	}

	let sql = `select  * from Polls order by pollID desc;`


	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

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

	let sql = `select  chatID, content, class, pinned, (select username from sselvaka.Users where sselvaka.Users.userID=sselvaka.Chats.author) as username from sselvaka.Chats ${filter} ${sort}`
	//console.log(sql)
	

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	
	connection.end();
});


/////////////////////////////////////////////////////////////////////////////////


app.post('/api/getTimeline', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `select * from sselvaka.TimelineItems`

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	connection.end();
});

/////////////////////////////////////////////////////////////////////////////////////
app.post('/api/addMailingList', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `UPDATE Users SET mailingList = 1 where firebaseID = '${req.body.firebaseID}';`

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({express: string})

	});

	connection.end();


});

/////////////////////////////////////////////////////////////////////////////////////

app.post('/api/loadEmails', (req,res) => {

	let connection = mysql.createConnection(config);


	let sql =` select username, email from sselvaka.Users;`


	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	connection.end();
});

/////////////////////////////////////////////////////////////////////////////////////
app.post('/api/addTimelineItem', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO TimelineItems (itemName, itemType, class, date) VALUES
	 ("${req.body.itemName}","${req.body.type}", "${req.body.topic}",'${req.body.date}');`


	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({express: string})

	});

	connection.end();


});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
