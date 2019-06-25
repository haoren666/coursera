(function () {
  'use script';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);
  LunchCheckController.$infect = ['$scope'];

  function LunchCheckController ($scope) {
    $scope.name = "";
    $scope.output = "";
    $scope.onClick = function () {
      return getOutputString($scope.name);
    };

    function getOutputString (string) {
      var str = string.split(',');
      var count = 0;
      for (var i = 0; i < str.length; i++) {
        if (str[i].trim() != "") {
          count++;
        }
      }
      if (count == 0) {
        $scope.output = "Please enter data first";
      } else if (count <= 3) {
        $scope.output = "Enjoy!";
      } else {
        $scope.output = "Too much!";
      }
    }
  }
})();
