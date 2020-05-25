'use strict';
app.controller('visaCounsellorProfileController', ['$scope', '$location', '$http', '$timeout', function($scope, $location, $http, $timeout) {
    const token = readCookie("access_token");
    let user = {};
    user.fname = readCookie("fname");
    user.lname = readCookie("lname");
    $scope.user = user;
    $scope.CurrentDate = new Date();
    // $http.defaults.headers.common.Authorization = `Bearer ${token}`;

    $http.get(BASE_URL + "/api/user", { headers: { 'Authorization': `Bearer ${token}` } }).then(response => {
        $scope.specialiseCountries = JSON.parse(response.data.user.specialise_countries);
        $scope.experienceLevel = response.data.user.countries_level;
        $scope.trainingFrom = Number(response.data.user.training_from);
        $scope.trainingTo = Number(response.data.user.training_to);
        $scope.totalFee = Number(response.data.user.totalFee);
        $scope.trainingDescription = response.data.user.training_description;
        // $scope.trainingTo = response.data.user.training_to;
        $scope.speakLanguages = JSON.parse(response.data.user.speak_languages);
        $scope.profileTitle = response.data.user.profile_title;
        $scope.profileOverview = response.data.user.profile_overview;
        var profile__image = BASE_URL + "/public" + response.data.user.profile_image;
        $scope.profileImage = profile__image;
        $scope.previewImage = profile__image;
        $scope.phoneVerificationNumber = response.data.user.phone_verification_number;
        $scope.phoneVerifiedAt = response.data.user.phone_verified_at;
    });

}]);