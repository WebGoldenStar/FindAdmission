'use strict';
app.controller('loginController', ["$scope", "$http", "$location", "$interval", "$routeParams", "$q", function($scope, $http, $location, $timeout, $routeParams, $q) {
    $scope.signin = function() {

        var data = {
            'email': $scope.loginemail,
            'password': $scope.loginpassword,
            'check2': false,
        };

        $http.post(BASE_URL + "/api/visacounsellor/login", data).then(function(response) {
            if (response.status === 200) {
                console.log(response);
                const token = response.data.token;

                // $http.defaults.headers.common.Authorization = `Bearer ${token}`;
                $http.get(BASE_URL + "/api/visacounsellor/user", { headers: { 'Authorization': `Bearer ${token}` } }).then(response => {
                    var lifetime = 999999999;
                    createCookie("lifetime", lifetime, lifetime);
                    createCookie("loggedin", true, lifetime);
                    createCookie("access_token", token, lifetime);
                    createCookie("fname", response.data.user.firstname, lifetime);
                    createCookie("lname", response.data.user.lastname, lifetime);
                    createCookie("email", response.data.user.email, lifetime);
                    createCookie("userId", response.data.user.id, lifetime);
                    // $location.path('home.login');
                    $location.path('admin');
                    // document.location.href = "/FindAdmission/dashboard";
                });

                // $http.get("http://127.0.0.1:8000/api/user", { token: response.data.token }).then(function(response) {

                //     console.log(response);
                //     // $location('/dashboard');
                // });
            }

        });
    }

}]);