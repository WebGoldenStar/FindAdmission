app.controller('visaCounsellorController', ['$scope', '$location', function($scope, $location) {
    $scope.step = "step1";
    $scope.isActive = function(activeStep) {
        return activeStep === $scope.step;
    }
}]);