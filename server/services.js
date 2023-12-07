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
    let id = "res" + Date.now();

    let reviewData = {
      id: id,
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
    let id = req.query;
    console.log(req);

    //let del_id = new ObjectId(id);
    //console.log(id);
    console.log("got here in delete");
    let search = { id: id };
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
};

module.exports = services;
