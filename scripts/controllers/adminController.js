app.controller('adminController', ['$scope', '$location', function($scope, $location) {
    let token = readCookie("access_token");
    if (!token) {
        $location.path('home');
    }

}]);