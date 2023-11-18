const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
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
    await db_connect.collection("records")
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
    await db_connect.collection("records")
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
 
 
module.exports = recordRoutes;