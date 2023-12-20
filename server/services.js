const fs = require("fs");
const path = require("path");
const glob = require("glob");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

//database url
let dbURL = "mongodb://localhost";

const DATABASE_FILE = path.join(__dirname + "/files/data.txt");

let services = function (app) {
  app.post("/write-record", function (req, res) {
    let reviewData = {
      customerName: req.body.customerName,
      dateVisited: req.body.dateVisited,
      mainDish: req.body.mainDish,
      score: req.body.score,
      reccomend: req.body.reccomend,
    };

    let restaurantData = [];

    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          let dbo = client.db("restaurantReviews");

          dbo
            .collection("restaurantData")
            .insertOne(reviewData, function (err) {
              if (err) {
                return res.status(201).send(JSON.stringify({ msg: err }));
              } else {
                return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
              }
            });
        }
      }
    );
  });

  //get
  app.get("/read-records", function (req, res) {
    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          let dbo = client.db("restaurantReviews");
          dbo
            .collection("restaurantData")
            .find()
            .toArray(function (err, data) {
              if (err) {
                return res.status(201).send(JSON.stringify({ msg: err }));
              } else {
                return res
                  .status(200)
                  .send(
                    JSON.stringify({ msg: "SUCCESS", restaurantData: data })
                  );
              }
            });
        }
      }
    );
  });

  //delete
  app.delete("/delete-records", function (req, res) {
    let revID = req.query.revID;

    let r_id = new ObjectId(revID);
    //console.log(id);
    console.log("got here in delete");
    let search = { _id: r_id };
    console.log(search);

    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          let dbo = client.db("restaurantReviews");
          dbo.collection("restaurantData").deleteOne(search, function (err) {
            if (err) {
              return res.status(201).send(JSON.stringify({ msg: err }));
            } else {
              return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
            }
          });
        }
      }
    );
  });

  //getScores
  app.get("/read-recordsByScore", function (req, res) {
    let revScore = req.query.score;

    let search = revScore === "" ? {} : { score: revScore }; // left of colon is type and to the right is val
    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          let dbo = client.db("restaurantReviews");
          dbo
            .collection("restaurantData")
            .find(search)
            .toArray(function (err, data) {
              if (err) {
                return res.status(201).send(JSON.stringify({ msg: err }));
              } else {
                return res
                  .status(200)
                  .send(
                    JSON.stringify({ msg: "SUCCESS", restaurantData: data })
                  );
              }
            });
        }
      }
    );
  });

  //update  STILL EDITTING
  app.put("/update-record", function (req, res) {
    let customerName = req.body.customerName;
    let dateVisited = req.body.dateVisited;
    let mainDish = req.body.mainDish;
    let score = req.body.score;
    let reccomend = req.body.reccomend;
    let revID = req.body.ID;

    let r_id = new ObjectId(revID);

    let search = { _id: r_id };

    let updateData = {
      $set: {
        customerName: customerName,
        dateVisited: dateVisited,
        mainDish: mainDish,
        score: score,
        reccomend: reccomend,
      },
    };
    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          let dbo = client.db("restaurantReviews");
          dbo
            .collection("restaurantData")
            .updateOne(search, updateData, function (err) {
              if (err) {
                return res.status(201).send(JSON.stringify({ msg: err }));
              } else {
                return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
              }
            });
        }
      }
    );
  });
};

module.exports = services;
