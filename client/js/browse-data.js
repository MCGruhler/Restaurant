let restaurantData = [];
let currentRev = 0;

let app = angular.module("browseDataApp", []);

console.log("im in js file");
app.controller("browseDataCtrl", function ($scope, $http) {
  console.log("im in ctrler");
  $scope.resData = {};
  $scope.reviews = {};
  $scope.reviews.current = currentRev + 1;

  $scope.get_reviews = function () {
    $http({
      method: "get",
      url: "http://localhost:4000/read-records",
    }).then(function (response) {
      if (response.data.message === "SUCCESS") {
        restaurantData = JSON.parse(response.data.restaurantData);
        $scope.resData = restaurantData[currentRev];
        $scope.reviews.total = restaurantData.length;
        console.log($scope.resData);
      } else {
        console.log(response.data.message);
      }
    }),
      function (response) {
        console.log(response);
      };
  };
  $scope.get_reviews();

  $scope.changeRev = function (direction) {
    currentRev += direction;
    if (currentRev < 0) {
      currentRev = restaurantData.length - 1;
    } else if (currentRev > restaurantData.length - 1) {
      currentRev = 0;
    }
    $scope.resData = restaurantData[currentRev];
    $scope.reviews.current = currentRev + 1;
  };
});
