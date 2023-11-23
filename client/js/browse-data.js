let revs = [];
let currentRev = 0;

let app = angular.module("browseDataApp", []);

app.controller("browseDataCtrl", function ($scope, $http) {
  $scope.resData = {};
  $scope.get_reviews = function () {
    $http({
      method: "get",
    });
  };
});
