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


	 ("${req.body.messagebody}", (SELECT userID FROM sabuosba.Users WHERE firebaseID = '${req.body.firebaseID}'), '${req.body.filter}');`


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


////////////////////////////////////////////////////////////////////////////////

app.post('/api/checkReport', (req,res) => {
	console.log("welwkere"+req.body.firebaseID)
	let connection = mysql.createConnection(config);
	let sql = `select reported from Users where firebaseID = '${req.body.firebaseID}';`
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

	 ("${req.body.updatetitle}","${req.body.updatebody}", (SELECT userID FROM sabuosba.Users WHERE firebaseID = '${req.body.firebaseID}'), '${req.body.filter}');`

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
app.post('/api/upvoteUpdate', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `UPDATE NewsUpdates SET upVoteCount = upVoteCount + 1 WHERE updateID='${req.body.updateID}';`

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
app.post('/api/reportUser', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `UPDATE sabuosba.Users SET reported = 1 WHERE userID='${req.body.userID}';`

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
app.post('/api/downvoteUpdate', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `UPDATE NewsUpdates SET upVoteCount = upVoteCount - 1 WHERE updateID='${req.body.updateID}';`

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
// reported = 0 - not reported 
// reported = 1 - reported 
// reported = 2 - approved
// reported = 3 - blocked 

app.post('/api/approveMessage', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `UPDATE sabuosba.Chats SET reported = 2 WHERE chatID='${req.body.chatID}';`

	console.log(sql)
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
// reported = 0 - not reported 
// reported = 1 - reported 
// reported = 2 - approved
// reported = 3 - blocked 

app.post('/api/blockMessage', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `UPDATE sabuosba.Chats SET reported = 3 WHERE chatID='${req.body.chatID}';`

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

app.post('/api/addPoll', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO Polls (description, class, option1, option2, option3, option4) VALUES
	 ("${req.body.description}", "${req.body.topic}", "${req.body.option1}","${req.body.option2}","${req.body.option3}","${req.body.option4}");`
	console.log(sql)



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
		filter="class = '"+req.body.mainPagefilter+"'";
	}else{
		filter=""
	}
	
	let tagFilter;
	if(req.body.tag=="10"){
		tagFilter="pinned = '1'";
	}else{
		tagFilter=""
	}

	let any;
	if(tagFilter!="" || filter!=""){
		any="WHERE"
	}else{
		any=""
	}

	let combo;
	if(tagFilter!="" && filter!=""){
		combo="AND"
	}else{
		combo=""
	}
	console.log(combo)
	
	let sort;
	if(req.body.sort=="" || req.body.sort=="10"){
		sort = " order by updateID desc;"
	}else if(req.body.sort=="20"){
		sort = " order by updateID asc;"
	}else if(req.body.sort=="30"){
		sort = " order by upVoteCount desc;"
	}
	console.log(sort)
	
	let sql = `select  updateID, title, upVoteCount, content, class, pinned, (select username from sabuosba.Users where sabuosba.Users.userID=sabuosba.NewsUpdates.author) as username from sabuosba.NewsUpdates ${any} ${filter} ${combo} ${tagFilter} ${sort}`


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
	console.log(req.body.filter)

	let filter;
	if(req.body.filter!=""){
		filter=" where class = '"+req.body.filter+"'";
	}else{
		filter=""
	}

	let sql = `select * from Polls ${filter} order by pollID desc;`
	console.log(sql)


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
	console.log(typeof (req.body.userFilter));

	let filter;
	if(req.body.filter!=""){
		filter="and class = '"+req.body.filter+"'";
	}else{
		filter=""
	}

	let userFilter;
	if(req.body.userFilter !=""){
		userFilter=" and author = " + req.body.userFilter;
	}else{
		userFilter="";
	}

	let sort;
	if(req.body.sort=="0" || req.body.sort=="10"){
		sort = " order by chatID desc;"
	}else if(req.body.sort=="20"){
		sort = " order by chatID asc;"
	}else{
		sort = " order by chatID desc;"
	}



	let sql = `select  chatID, author, content, upvote, class, pinned, reported, (select username from sabuosba.Users where sabuosba.Users.userID=sabuosba.Chats.author) as username from sabuosba.Chats where (reported = 0 or reported = 1 or reported = 2) ${filter} ${userFilter} ${sort} `


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

	let tagFilter;
	if(req.body.tag=="10"){
		tagFilter="and pinned = '1'";
	}else{
		tagFilter=""
	}


	let sql = `select * from sabuosba.TimelineItems where date > CURRENT_TIMESTAMP ${tagFilter} order by date asc`
	console.log(sql)


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
	let sql = `UPDATE sabuosba.Users SET mailingList = 1 where firebaseID = '${req.body.firebaseID}';`
	console.log(sql)

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
// reported = 0 - not reported 
// reported = 1 - reported 
// reported = 2 - approved
// reported = 3 - blocked 

app.post('/api/reportMessage', (req,res) => {
	console.log ('report')
	let connection = mysql.createConnection(config);
	let sql = `UPDATE sabuosba.Chats SET reported = 1 where chatID = '${req.body.chatID}';`
	
	console.log(sql)

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({express: string})

	});

	connection.end();


});


///////////////////////

app.post('/api/addPollVote', (req,res) => {

	let connection = mysql.createConnection(config);

	let voteType;
	if(req.body.vote=="1"){
		voteType="votes1"
	}else if (req.body.vote=="2") {
		voteType="votes2"
	}else if (req.body.vote=="3") {
		voteType="votes3"
	}else if (req.body.vote=="4") {
		voteType="votes4"
	}else {
		voteType=""
	}

	let sql = `UPDATE Polls SET ${voteType} = ${voteType} + 1 WHERE pollID = ${req.body.pollID};`

	console.log(sql)

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({express: string})

	});

	connection.end();


});

////////////////////////////////////////

app.post('/api/addTimeLineVote', (req,res) => {

	let connection = mysql.createConnection(config);
/*
	let sql = `INSERT INTO TimelineVotes (userID, itemID, value) VALUES 

	((SELECT userID FROM sabuosba.Users WHERE firebaseID = '${req.body.firebaseID}'),"${req.body.itemID}", "${req.body.voteTimeline}");`
*/
	let sql = `UPDATE TimelineItems SET ${req.body.voteTimeline} = ${req.body.voteTimeline} + 1 WHERE itemID='${req.body.itemID}';`

	

	console.log(sql)

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

app.post('/api/addChatVote', (req,res) => {

	let connection = mysql.createConnection(config);
/*
	let sql = `INSERT INTO TimelineVotes (userID, itemID, value) VALUES 

	((SELECT userID FROM sabuosba.Users WHERE firebaseID = '${req.body.firebaseID}'),"${req.body.itemID}", "${req.body.voteTimeline}");`
*/
	let sql
	if (req.body.voteChat=="upvote"){
		sql = `UPDATE Chats SET upvote = upvote + 1 WHERE chatID='${req.body.chatID}';`
	}else{
		sql = `UPDATE Chats SET upvote = upvote - 1 WHERE chatID='${req.body.chatID}';`
	}
	

	

	console.log(sql)

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({express: string})

	});

	connection.end();


});







///////////////////////////////////////////////////////////////////////////////

app.post('/api/loadEmails', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql =` select userID, username, email, reported from sabuosba.Users order by username asc;`

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

app.post('/api/loadReportedEmails', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql =` select username, email from sabuosba.Users where reported = 1;`

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

/////////////////////////////////////////////////////////////////////////////////////


app.post('/api/getReportedMessages', (req,res) => {

	let connection = mysql.createConnection(config);
	let sql = `select  chatID, author, content, class, pinned, reported, (select username from sabuosba.Users where sabuosba.Users.userID=sabuosba.Chats.author) as username from sabuosba.Chats where reported =1 or reported = 3 order by reported asc`


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

app.post('/api/getMailingList', (req,res) => {

	let connection = mysql.createConnection(config);


	let sql =` select username, email from sabuosba.Users where sabuosba.Users.mailingList = 1;`



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
app.post('/api/deleteNewsUpdate', (req,res) => {
	let connection = mysql.createConnection(config);
	console.log("api reached");
	let sql = `delete from sabuosba.NewsUpdates where updateID = ${req.body.updateID};`
	
	console.log(req.body.updateID);

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	connection.end();
})
/////////////////////////////////////////////////////////////////////////////////
app.post('/api/pinNewsUpdate', (req,res) => {
	let connection = mysql.createConnection(config);
	console.log("api reached");
	let sql = `UPDATE NewsUpdates SET pinned = 1 WHERE updateID=${req.body.updateID};`
	console.log(req.body.updateID);

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	connection.end();
})


/////////////////////////////////////////////////////////////////////////////////
app.post('/api/pinTimeline', (req,res) => {
	let connection = mysql.createConnection(config);
	console.log("api reached");
	let sql = `UPDATE TimelineItems SET pinned = 1 WHERE itemID=${req.body.itemID};`
	console.log(req.body.itemID);

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	connection.end();
})
//////////////////////////////////////////////////////////////////
	app.post('/api/pinPoll', (req,res) => {
		let connection = mysql.createConnection(config);
		console.log("api reached");
		let sql = `UPDATE Polls SET pinned = 1 WHERE pollID=${req.body.pollID};`
		console.log(req.body.pollID);
	
		connection.query(sql,(error, results, fields) => {
			if (error){
				return console.error(error.message);
			}
	
			//console.log(results);
			let string = JSON.stringify(results)
			res.send({express: string})
	
		});
		connection.end();
	})
//////////////////////////////////////////////////////////////////

app.post('/api/deleteChat', (req,res) => {
	let connection = mysql.createConnection(config);
	console.log("api reached");
	let sql = `delete from sabuosba.Chats where chatID = ${req.body.chatID};`
	console.log(req.body.updateID);

	connection.query(sql,(error, results, fields) => {
		if (error){
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results)
		res.send({express: string})

	});
	connection.end();
})

////////////////////////////////////////////////////////////////////////////

app.post('/api/checkUserID', (req,res) => {
	console.log("welwkere"+req.body.firebaseID)
	let connection = mysql.createConnection(config);
	let sql = `select userID from Users where firebaseID = '${req.body.firebaseID}';`
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

app.post('/api/getUsers', (req,res) => {
	console.log("welwkere"+req.body.firebaseID)
	let connection = mysql.createConnection(config);
	let sql = `select username, userID from Users;`
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

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server