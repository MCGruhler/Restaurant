const fs = require("fs");
const path = require("path");

const DATABASE_FILE = path.join(__dirname + "/files/data.txt");

let services = function (app) {
  app.post("/write-record", function (req, res) {
    let id = "res" + Date.now();

    console.log("got to server");

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
};

module.exports = services;
