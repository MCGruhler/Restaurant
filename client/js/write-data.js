let app = angular.module("writeDataApp", []);

app.controller("writeDataCtrl", function ($scope, $http) {
  console.log("im in controller");

  $scope.clickSubmitWrite = function () {
    let customerName = this.customerName;
    let dateVisited = this.date.toLocaleDateString();
    let mainDish = this.mainDish;
    let score = this.score;
    let reccomend = this.reccomend;

    $scope.clearWrite();

    $http({
      method: "post",
      url: "http://localhost:4000/write-record",
      data: {
        customerName: customerName,
        dateVisited: dateVisited,
        mainDish: mainDish,
        score: score,
        reccomend: reccomend,
      },
    }).then(
      function (response) {
        console.log(response.data);
      },
      function (response) {
        console.log(response);
      }
    );
  };

  $scope.clearWrite = function () {
    $scope.customerName = "";
    $scope.date = "";
    $scope.mainDish = "";
    $scope.score = "";
    $scope.reccomend = "";
  };
});

/*

$("#submit").click(function () {
  let customerName = $("#customerName").val();
  let dateVisited = $("#dateVisited").val();
  let mainDish = $("#mainDish option:selected").text();
  let score = $("#score").val();
  let reccomend = $("#reccomend").val();
  clickSubmitWrite(customerName, dateVisited, mainDish, score, reccomend);
});

$("#clear").click(function () {
  $("#customerName").val("");
  $("#dateVisited").val("");
  $("#mainDish").val("");
  $("#score").val("");
  $("#reccomend").val("");
});


function clickSubmitWrite(
  customerName,
  dateVisited,
  mainDish,
  score,
  reccomend
) {
  $.ajax({
    url: "http://localhost:4000/write-record",
    type: "post",
    data: {
      customerName: customerName,
      dateVisited: dateVisited,
      mainDish: mainDish,
      score: score,
      reccomend: reccomend,
    },
    success: function (response) {
      let data = JSON.parse(response);
      console.log(data);
    },
    error: function (response) {
      console.log("error");
    },
  });
}

//console.data(restaurantData);

$http({
  method: "post",
  url: "http://localhost:4000/write-record",
  data: {
    customerName: customerName,
    dateVisited: dateVisited,
    mainDish: mainDish,
    score: score,
    reccomend: reccomend,
  },
}).then(
  function (response) {
    console.log(response.data);
  },
  function (response) {
    console.log(response);
  }
);
*/
