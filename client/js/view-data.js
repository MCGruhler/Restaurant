let app = angular.module("viewDataApp", []);

app.controller("viewDataCtrl", function ($scope, $http) {
  $scope.revs = [];
  $scope.scores = [];

  $scope.get_reviews = function () {
    $http({
      method: "get",
      url: "http://localhost:4000/read-records",
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          $scope.revs = response.data.restaurantData;
          $scope.scores = getScores($scope.revs);
          $scope.selectedScore = $scope.scores[0];
          console.log($scope.revs);
        } else {
          console.log(response.data.msg);
        }
      },
      function (response) {
        console.log(JSON.stringify(response));
      }
    );
  };

  $scope.get_reviews();

  $scope.redrawTable = function () {
    let score = $scope.selectedScore.value;
    console.log(score);

    //had to add if/else because issue with all's value and score would return nothing
    if (!score) {
      $scope.get_reviews();
    } else {
      $http({
        method: "get",
        url: "/read-recordsByScore",
        params: { score: score },
      }).then(
        function (response) {
          if (response.data.msg === "SUCCESS") {
            $scope.revs = response.data.restaurantData;
          }
        },
        function (response) {
          console.log(response);
        }
      );
    }
  };

  $scope.deleteRev = function (revID) {
    $http({
      method: "delete",
      url: "http://localhost:4000/delete-records",
      params: { revID: revID },
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          $scope.redrawTable();
        } else {
          console.log(repsonse.data.msg);
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };

  //-------- EDIT/UPDATE SECTION

  $scope.editRev = function (revNumber) {
    $scope.customerName = $scope.revs[revNumber].customerName;
    $scope.dateVisited = $scope.revs[revNumber].dateVisited;
    $scope.mainDish = $scope.revs[revNumber].mainDish;
    $scope.score = $scope.revs[revNumber].score;
    $scope.reccomend = $scope.revs[revNumber].reccomend;
    $scope.revID = $scope.revs[revNumber]["_id"];

    $scope.hideTable = true;
    $scope.hideForm = false;
  };

  $scope.cancelUpdate = function () {
    $scope.hideTable = false;
    $scope.hideForm = true;
  };

  $scope.updateRev = function () {
    if (
      $scope.customerName == "" ||
      $scope.dateVisited == "" ||
      $scope.score == "" ||
      $scope.mainDish == "" ||
      $scope.reccomend == ""
    ) {
      $scope.addResults = "All input fields are required";
      console.log($scope.customerName);
      console.log($scope.dateVisited);
      console.log($scope.score);
      console.log($scope.mainDish);
      console.log($scope.reccomend);
      console.log("stuck here");
      return;
    }

    $http({
      method: "put",
      url: "http://localhost:4000/update-record",
      data: {
        "ID": $scope.revID,
        customerName: $scope.customerName,
        dateVisited: $scope.dateVisited,
        mainDish: $scope.mainDish,
        score: $scope.score,
        reccomend: $scope.reccomend,
      },
    }).then(
      function (response) {
        console.log(response);
        if (response.data.msg === "SUCCESS") {
          $scope.cancelUpdate();
          $scope.get_reviews();

          $scope.customerName = "";
          $scope.dateVisited = "";
          $scope.mainDish = "";
          $scope.score = "";
          $scope.reccomend = "";
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };
});

function getScores(resTable) {
  let scoreExsits;

  let scoresArr = [{ vale: "", display: "ALL" }];

  for (let i = 0; i < resTable.length; i++) {
    scoreExsits = scoresArr.find(function (element) {
      return element.value === resTable[i].score;
    });

    if (scoreExsits) {
      continue;
    } else {
      scoresArr.push({ value: resTable[i].score, display: resTable[i].score });
    }
  }
  return scoresArr;
}
