const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Account Related APIs -----------------------------------------------------------------------------------/
 
// This section will help you create a new account.
recordRoutes.route("/account/register").post(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  try {
    await db_connect.collection("users")
    .insertOne(myobj)
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when creating a new user account: " + e);
  }

});



// This section will help you login.
recordRoutes.route("/account/login").post(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    await db_connect.collection("users")
    .find(myobj)
    .toArray()
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
  console.log("An error occurred when finding a new user account: " + e);
  }

});

// this route checks whether there is an account with the same email in the database
recordRoutes.route("/account/check/duplicate/:email").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    email: req.params.email
  };

  try {
    await db_connect.collection("users")
    .find(myobj)
    .toArray()
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
  console.log("An error occurred when trying to verify existing account: " + e);
  }

});


// Article Related APIs -----------------------------------------------------------------------------------/
 
// this route gets all articles written by the user
recordRoutes.route("/articles/:email").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    author: req.params.email
  };

  try {
    await db_connect.collection("articles")
    .find(myobj)
    .toArray()
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
  console.log("An error occurred when trying to get articles written by the user: " + e);
  }

});
 
// This section will help you create a new article
recordRoutes.route("/articles/draft").post(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
    upvote: req.body.upvote,
    downvote: req.body.downvote,
    published: req.body.published
  };

  try {
    await db_connect.collection("articles")
    .insertOne(myobj)
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when creating a new article: " + e);
  }

});

// This section will help you get a specific article based on their id
recordRoutes.route("/articles/article/:id").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    _id: new ObjectId(req.params.id)
  };

  try {
    await db_connect.collection("articles")
    .find(myobj)
    .toArray()
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when trying to get a single article: " + e);
  }
});

// This section will help you get the name of the author based on their email
recordRoutes.route("/articles/article/author/:email").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    email: req.params.email
  };

  try {
    await db_connect.collection("users")
    .find(myobj)
    .toArray()
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when trying to get author name based on their email: " + e);
  }
});


// Comment Related APIs -----------------------------------------------------------------------------------/

// This section will help you create a new comment
recordRoutes.route("/comments/draft").post(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    under: req.body.under,
    content: req.body.content,
    author: req.body.author,
    upvote: req.body.upvote,
    downvote: req.body.downvote,
    published: req.body.published
  };

  try {
    await db_connect.collection("comments")
    .insertOne(myobj)
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when creating a new comment: " + e);
  }

});


// This section will help you get all comments posted under a particular particular
recordRoutes.route("/comments/:articleID").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    under: req.params.articleID
  };

  try {
    await db_connect.collection("comments")
    .find(myobj)
    .toArray()
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when trying to get comments under a article: " + e);
  }
});

module.exports = recordRoutes;