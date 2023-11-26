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

// This section will help you update upvotes/downvotes
recordRoutes.route("/articles/article/updownvote/update").put(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  // get the article we want to update
  let articleFilter = {
    _id: new ObjectId(req.body.id)
  };

  updateDocument = {
    $set: {
      upvote: req.body.upvote,
      downvote: req.body.downvote
    }
  }

  try {
    await db_connect.collection("articles")
    .updateOne(articleFilter, updateDocument)
    .then(
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when trying to update upvote/downvote for an article: " + e);
  }
});


// This section will help you get at most 3 articles from the politics category
// original set as /articles/politics, which is in conflict with the articles/:email api defined above
// Important! API endpoints need to be unique and un-ambiguous!!
recordRoutes.route("/articles/get/politics").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    category: ['Politics']
  };

  // note for myself:
  // MongoDB 3.2 introduces the ability to sample from the database, however,
  // this requires there are at least 100 documents in the database. For the purpose
  // of this project, we will simply grab all articles and select a subset of them
  // since there are only a handle of articles; however, for most efficient sampling
  // please use mongoDB's sample() method in the future.
  // See referrence at: https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/

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
    console.log("An error occurred when trying to get politics articles: " + e);
  }
});


// This section will help you get at most 3 articles from the business category
recordRoutes.route("/articles/get/business").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    category: ['Business']
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
    console.log("An error occurred when trying to get business articles: " + e);
  }
});

// This section will help you get at most 3 articles from the sports category
recordRoutes.route("/articles/get/sports").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    category: ['Sports']
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
    console.log("An error occurred when trying to get sports articles: " + e);
  }
});

// This section will help you get at most 3 articles from the entertainment category
recordRoutes.route("/articles/get/entertain").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    category: ['Entertainment']
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
    console.log("An error occurred when trying to get entertainment articles: " + e);
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


// This section will help you get all comments posted under a particular article
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

// This section will help you get all comments posted by a particular person
recordRoutes.route("/comments/author/:email").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    author: req.params.email
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
    console.log("An error occurred when trying to get comments by a person: " + e);
  }
});

// This section will help you get an article from a comment
recordRoutes.route("/comments/article/:articleID").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  let myobj = {
    _id: new ObjectId(req.params.articleID)
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
    console.log("An error occurred when trying to article from a comment: " + e);
  }
});


// Ads Related APIs -----------------------------------------------------------------------------------/
// This section will help you get all ads from the database
recordRoutes.route("/ads/getall").get(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  try {
    await db_connect.collection("advertisement")
    .find()
    .toArray()
    .then( 
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when trying to get all comments: " + e);
  }
});


// This section will help you update ad click times
recordRoutes.route("/ads/clickupdate").put(async function (req, res) {
  //get the database
  let db_connect = dbo.getDb();

  filter = {
    _id: new ObjectId(req.body._id)
  };

  updateDocument = {
    $set: {
      clicks: req.body.clicks + 1
    }
  }

  try {
    await db_connect.collection("advertisement")
    .updateOne(filter, updateDocument)
    .then(
      results => res.send(results)
      )
    .catch(
      error=> console.error(error)
      );
  } catch (e) {
    console.log("An error occurred when trying to update click numbers: " + e);
  }
});


module.exports = recordRoutes;