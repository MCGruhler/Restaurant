const fs = require("fs");
const path = require("path");
const glob = require("glob");

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

    if (fs.existsSync(DATABASE_FILE)) {
      //read in current database
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          restaurantData = JSON.parse(data);

          restaurantData.push(reviewData);

          fs.writeFile(
            DATABASE_FILE,
            JSON.stringify(restaurantData),
            function (err) {
              if (err) {
                res.send(JSON.stringify({ msg: err }));
              } else {
                res.send(JSON.stringify({ msg: "SUCCESS" }));
              }
            }
          );
        }
      });
    } else {
      restaurantData.push(reviewData);

      fs.writeFile(
        DATABASE_FILE,
        JSON.stringify(restaurantData),
        function (err) {
          if (err) {
            res.send(JSON.stringify({ msg: err }));
          } else {
            res.send(JSON.stringify({ msg: "SUCCESS" }));
          }
        }
      );
    }
  });

  //get
  app.get("/read-records", function (req, res) {
    fs.readFile(DATABASE_FILE, "utf8", function (err, data) {
      if (err) {
        return res.status(500).send(JSON.stringify({ message: err }));
      } else {
        return res
          .status(200)
          .send(JSON.stringify({ message: "SUCCESS", restaurantData: data }));
      }
    });
  });

  //delete
  app.delete("/delete-records", function (req, res) {
    let id = req.body.id;

    let restaurantData = [];

    //read in current database
    fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
      if (err) {
        res.send(JSON.stringify({ msg: err }));
      } else {
        restaurantData = JSON.parse(data);
        for (let i = 0; i < restaurantData.length; i++) {
          if (restaurantData[i].id == id) {
            restaurantData.splice(i, 1);
          }
        }

        fs.writeFile(
          DATABASE_FILE,
          JSON.stringify(restaurantData),
          function (err) {
            if (err) {
              res.send(JSON.stringify({ msg: err }));
            } else {
              res.send(JSON.stringify({ msg: "deleted" }));
            }
          }
        );
      }
    });
  });
};

module.exports = services;
