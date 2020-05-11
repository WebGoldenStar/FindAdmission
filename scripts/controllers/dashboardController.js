app.controller('dashboardController', ['$scope', '$location', function($scope, $location) {
    let token = readCookie("access_token");
    if (!token) {
        $location.path('home');
    }
    let user = {};
    user.fname = readCookie("fname");
    user.lname = readCookie("lname");
    $scope.user = user;
    $scope.introduction_step1 = false;
    $scope.introduction_step2 = false;
    $scope.open_introduction_step1 = function() {
        console.log($scope.visa_counsellor);

        $scope.introduction_step1 = !$scope.introduction_step1;
    }
    $scope.open_introduction_step2 = function() {
        //console.log($scope.visa_counsellor);

        $scope.introduction_step1 = !$scope.introduction_step1;
        $scope.introduction_step2 = true;
    }
}]);