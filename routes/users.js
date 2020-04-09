/*File that deals with routing of the user login,register,account page,adming page and with getting/inserting data from the api/databse */
var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const fetch = require("node-fetch");
const bcryptjs = require("bcryptjs");
//create a mysql pool with database data
const pool = mysql.createPool(
{
	host: 'localhost',
	user: 'root',
	database: 'postcodeapi',
	multipleStatements: true
})
//create a connection to mysql by calling the pool
function getConnection()
{
	return pool
}
//function to redirect home of the user is logged in
const redirectHome = (req, res, next) =>
{
	if (req.session.userEmail)
	{
		res.redirect("/");
	}
	else
	{
		next();
	}
}
//function to redirect home of the user is not logged in
const redirectHome2 = (req, res, next) =>
{
	if (!req.session.userEmail)
	{
		res.redirect("/");
	}
	else
	{
		next();
	}
}
//router that renders the register page
router.get('/register', redirectHome, function(req, res, next)
{
	res.render('registerUser',
	{
		title: '',
		success: req.session.success,
		errors: req.session.errors
	});
	req.session.destroy(function(err)
	{
		if (err) return next(err)
	})
});
//router that renders the login page
router.get('/login', redirectHome, function(req, res, next)
{
	res.render('login',
	{
		title: '',
		success: req.session.success,
		errors: req.session.errors
	});
	req.session.destroy(function(err)
	{
		if (err) return next(err)
	})
});
//router that is used to register new users
router.post('/user_create', (req, res) =>
{
	//get the current date to log when the user was registered     
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const connection = getConnection();
	const queryString = "SELECT * FROM users WHERE email =?";
	const userEmail = req.body.email;
	//check if there is already a user with that email address  
	connection.query(queryString, [userEmail], (err, rows, fields) =>
	{
		if (rows.length > 0)
		{
			console.log("user found error");
			req.session.success = "error";
			res.redirect('/users/register');
		}
		else
		{
			//hash the password
			bcryptjs.hash(req.body.password, 10, (err, hash) =>
			{
				if (err)
				{
					return res.status(500).json(
					{
						error: err
					})
				}
				else
				{
					const email = req.body.email;
					const firstName = req.body.fName;
					const lastName = req.body.lName;
					const password = hash;
					const address = req.body.address;
					const pCode = req.body.postCode;
					const city = req.body.city;
					//insert into db 
					const queryString = "REPLACE INTO users (Email,fName,lName,Password,Address,PostCode,City,TimeStamp) VALUES (?,?,?,?,?,?,?,?)";
					connection.query(queryString, [email, firstName, lastName, password, address, pCode, city, date], (err, result, fields) =>
					{
						if (err)
						{
							console.log("failed to insert new user" + err)
							return
						}
						console.log("inserted a new user with the id", result.insertId);
						const queryString = "SELECT * FROM users WHERE email =?";
						connection.query(queryString, [email], (err, rows, fields) =>
						{
							if (rows.length > 0)
							{
								console.log("user found");
								console.log(rows);
								req.session.loggedin = true;
								req.session.userEmail = email;
								req.session.userType = rows[0].AccountType;
								res.redirect('/');
							}
							else
							{}
						})
					})
				}
			});
		}
	});
});
router.post('/user_create2', (req, res) =>
{
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const connection = getConnection();
	const queryString = "SELECT * FROM users WHERE email =?";
	const userEmail = req.body.email;
	connection.query(queryString, [userEmail], (err, rows, fields) =>
	{
		console.log(rows.length);
		if (rows.length > 0)
		{
			console.log("Email already exists");
			//console.log(rows);
			res.status(204).send();
		}
		else
		{
			console.log("user not found");
			console.log(rows);
			bcryptjs.hash(req.body.password, 10, (err, hash) =>
			{
				if (err)
				{
					return res.status(500).json(
					{
						error: err
					})
				}
				else
				{
					const email = req.body.email;
					const firstName = req.body.fName;
					const lastName = req.body.lName;
					const password = hash;
					const address = req.body.address;
					const pCode = req.body.postCode;
					const city = req.body.city;
					//console.log(email,firstName,lastName,password,pCode,address,city);
					const queryString = "REPLACE INTO users (Email,fName,lName,Password,Address,PostCode,City,TimeStamp) VALUES (?,?,?,?,?,?,?,?)";
					connection.query(queryString, [email, firstName, lastName, password, address, pCode, city, date], (err, result, fields) =>
					{
						if (err)
						{
							console.log("failed to insert new user" + err)
							return
						}
						res.redirect('/users/myAccount');
					})
				}
			});
		}
	});
});
//router for logging the user in
router.post('/auth', function(req, res, next)
{
	var email = req.body.email;
	var password = req.body.password;
	//check if that email exists in the user list
	if (email)
	{
		const connection = getConnection();
		const queryString = "SELECT * FROM users WHERE email =?";
		connection.query(queryString, [email], (err, result, fields) =>
		{
			//if the email exists compare the password
			if (result.length > 0)
			{
				bcryptjs.compare(password, result[0].Password, function(err, result2)
				{
					var accountType = result[0].AccountType;
					// res == true
					if (err)
					{
						console.log("error");
						/*
						return res.status(401).json({
						  message: 'Auth Failed'
						});
						*/
					}
					//log in the user and set up a session 
					if (result2)
					{
						req.session.loggedin = true;
						req.session.userEmail = email;
						req.session.userType = accountType;
						res.redirect('/');
						/*
						return res.status(200).json({
						  message: 'Auth Sucessful'
						})
						*/
					}
					else
					{
						req.session.success = "error";
						res.redirect('/users/login');
					}
					/*
					res.status(401).json({
					  message: 'Auth Failed'
					});
					*/
				});
			}
			else
			{
				req.session.success = "error";
				res.redirect('/users/login');
			}
			//res.end();
		});
	}
	else
	{
		//res.send("Plese enter username or password");
		//res.end();
	}
});
//router to allow the user to change their details 
router.post('/update_user', (req, res) =>
{
	var mail = req.session.userEmail;
	const email = req.body.email;
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	//const password = hash;
	const address = req.body.address;
	const pCode = req.body.postCode;
	const city = req.body.city;
	const connection = getConnection();
	//check if the email that the user changed to is taken if not save to database
	const queryString = "SELECT Email FROM users WHERE Email =?";
	connection.query(queryString, [email], (err, result, fields) =>
	{
		if (result.length > 0)
		{
			//if the same one as the user had previously overwrite it otherwise throw error
			if (result[0].Email == mail)
			{
				console.log("Can change to the same one ");
				connection.query('UPDATE users SET Email = ?,fName =?,lName =?,Address =?,PostCode =?,City =? WHERE Email = ?', [email, firstName, lastName, address, pCode, city, mail], function(err)
				{
					if (err) throw err;
					console.log("user Updated");
				});
				res.redirect("/users/myAccount");
			}
			else
			{
				console.log("Can not change as this is someone elses email");
				res.status(204).send();
			}
			//res.redirect("/");
			//redirect error
		}
		else
		{
			connection.query('UPDATE users SET Email = ?,fName =?,lName =?,Address =?,PostCode =?,City =? WHERE Email = ?', [email, firstName, lastName, address, pCode, city, mail], function(err)
			{
				if (err) throw err;
				console.log("user Updated");
			});
			req.session.userEmail = email;
			res.redirect("/users/myAccount");
			//redirect success
		}
	});
});
//router allowing the admin to edit user details
router.post('/update_user2', (req, res) =>
{
	const oldMail = req.body.mailOld;
	const email = req.body.email;
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const address = req.body.address;
	const pCode = req.body.postCode;
	const city = req.body.city;
	const connection = getConnection();
	//check if email already exists in the list of users
	const queryString = "SELECT Email FROM users WHERE Email =?";
	connection.query(queryString, [email], (err, result, fields) =>
	{
		//if yes
		if (result.length > 0)
		{
			console.log("checl mail", result[0].Email);
			//if it is the same as users old mail its ok  else email already exists
			if (oldMail == result[0].Email)
			{
				connection.query('UPDATE users SET Email = ?,fName =?,lName =?,Address =?,PostCode =?,City =? WHERE Email = ?', [email, firstName, lastName, address, pCode, city, oldMail], function(err)
				{
					if (err) throw err;
					console.log("user Updated");
				});
				res.redirect("/users/myAccount");
			}
			else
			{
				console.log("Email already exists this one");
				//console.log(rows);
				res.status(204).send();
			}
		}
		else
		{
			connection.query('UPDATE users SET Email = ?,fName =?,lName =?,Address =?,PostCode =?,City =? WHERE Email = ?', [email, firstName, lastName, address, pCode, city, oldMail], function(err)
			{
				if (err) throw err;
				console.log("user Updated");
			});
			res.redirect("/users/myAccount");
		}
	});
});
//router to allow the user to change their user password 
router.post('/update_user_password', (req, res) =>
{
	const connection = getConnection();
	var mail = req.session.userEmail;
	//if no password was typed in throw error othewsie hash the new password
	if (req.body.password == 0)
	{
		res.status(204).send();
	}
	else
	{
		bcryptjs.hash(req.body.password, 10, (err, hash) =>
		{
			if (err)
			{
				return res.status(500).json(
				{
					error: err
				})
			}
			else
			{
				const password = hash;
				connection.query('UPDATE users SET Password = ? WHERE Email = ?', [password, mail], function(err)
				{
					if (err)
					{
						console.log("failed to change password" + err)
						return
					}
					console.log("Password changed");
					res.redirect("/users/myAccount");
				});
			}
		});
	}
});
//router to log the user out and destroy their current session
router.post('/logout', redirectHome2, function(req, res, next)
{
	req.session.destroy(function(err)
	{
		if (err) return next(err)
		res.redirect('/');
	})
});
//router that allows the admin to delete a user
router.post('/delUser', (req, res) =>
{
	const connection = getConnection();
	var sql = "DELETE FROM users WHERE Email =?";
	connection.query(sql, [req.body.userMail], function(err, result)
	{
		if (err) throw err;
		console.log("Number of records deleted: " + result.affectedRows);
		res.redirect("/users/myAccount");
	});
});
//router to delete the users rating
router.post('/delRating', (req, res) =>
{
	var mail = req.session.userEmail;
	var wardRating = req.body.ratingWard;
	//if there is no rating selected dont do antyhing otherwise delte that rating
	if (wardRating == "")
	{
		res.status(204).send();
	}
	else
	{
		const connection = getConnection();
		var sql = "DELETE FROM rating WHERE Email =? AND WardName =?";
		connection.query(sql, [mail, wardRating], function(err, result)
		{
			if (err) throw err;
			console.log("Number of records deleted: " + result.affectedRows);
			res.redirect("/users/myAccount");
		});
	}
});
//router to rate an area
router.post('/rateArea', (req, res) =>
{
	var mail = req.session.userEmail;
	const connection = getConnection();
	//select a rating where ward and email address match current user details and choice of rating
	const queryString = "SELECT * FROM rating WHERE WardName =? AND Email =?";
	connection.query(queryString, [req.body.wardName, mail], (err, result, fields) =>
	{
		//if found the user rated this area already otherwise record the response
		if (result.length > 0)
		{
			console.log("already voted for this ward");
			res.status(204).send();
		}
		else
		{
			var sql = "REPLACE INTO RATING (Email,WardName,q1,q2,q3) VALUES ?";
			var values = [
				[mail, req.body.wardName, req.body.q1, req.body.q2, req.body.q3]
			];
			console.log(values);
			connection.query(sql, [values], function(err)
			{
				if (err) throw err;
			});
			res.status(204).send();
		}
	});
});
//router to render the account page and re direct if the user is not logged in back to the home page
router.get('/myAccount', redirectHome2, (req, res) =>
{
	res.render('account',
	{
		userMail: req.session.userEmail,
		accPage: 'Yes',
		accountType: req.session.userType
	});
});
//router to find out all of the ratings made by a specific user
router.get('/accountRating', (req, res) =>
{
	const connection = getConnection();
	var mail = req.session.userEmail;
	console.log("Mail?", mail);
	const queryString = "SELECT * FROM rating WHERE Email=?";
	connection.query(queryString, [mail], (err, rows, fields) =>
	{
		if (err)
		{
			console.log("failed to query for users" + err)
			//res.end()
			return
		}
		console.log("i think we fetched sucessfuly");
		res.json(rows);
	})
});
//router to get all of the user information
router.get('/userInfo', (req, res) =>
{
	const connection = getConnection();
	var mail = req.session.userEmail;
	const queryString = "SELECT * FROM users WHERE Email=?;SELECT * FROM users;SELECT SUM(AccountType ='Standard') AS Standard, SUM(AccountType ='Admin') AS Admin FROM users";
	connection.query(queryString, [mail], (err, rows, fields) =>
	{
		if (err)
		{
			console.log("failed to query for users" + err)
			//res.end()
			return
		}
		res.json(
		{
			User: rows[0],
			Users: rows[1],
			Total: rows[2],
		});
	})
});
//router to count up all the reviews for a given ward
router.get('/reviewCount/:ward', (req, res) =>
{
	const connection = getConnection();
	const ward = req.params.ward;
	//console.log(req.params);
	connection.query('SELECT SUM(q1="YES") AS q1Yes, SUM(q2="YES") AS q2Yes, SUM(q3="YES") As q3Yes, SUM(q1="No") As q1No, SUM(q2="No") As q2No, SUM(q3="No") As q3No FROM rating WHERE WardName =?;SELECT * FROM questions;SELECT WardName,SUM(q1="YES") AS q1Yes, SUM(q2="YES") AS q2Yes, SUM(q3="YES") As q3Yes, SUM(q1="No") As q1No, SUM(q2="No") As q2No, SUM(q3="No") As q3No FROM rating GROUP BY WardName', [ward], function(err, rows)
	{
		if (err) throw err;
		res.json(
		{
			review: rows[0],
			question: rows[1],
			allReview: rows[2]
		});
	});
});
//router to list all of the users in the website
router.get('/listAllUsers', (req, res) =>
{
	const connection = getConnection();
	var mail = req.session.userEmail;
	connection.query('SELECT * FROM users where Email =?;SELECT * FROM users', [mail], function(err, rows)
	{
		if (err) throw err;
		res.json(
		{
			usersList: rows[0],
			allUsers: rows[1]
		});
	});
});
module.exports = router;