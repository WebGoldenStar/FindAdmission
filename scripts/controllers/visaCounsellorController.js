'use strict';
app.controller('visaCounsellorController', ['$scope', '$location', '$http', '$timeout', function($scope, $location, $http, $timeout) {
    $scope.step = "step1";
    $scope.europeanCountries = ["Austria", "Belgium", "Bulgaria", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain"];
    $scope.americaCountries = ["Canada", "United States"];
    $scope.asiaCountries = ["Malaysia", "Hong Kong", "Japan", "India", "China", "Singapore", "Georgia"];
    $scope.specialiseCountries = [];
    $scope.experienceLevel = "Entry";
    $scope.languages = ["Select Language", "English", "French", "Arabic", "Somali", "Berber", "Amharic", "Oromo", "Igbo", "Swahili", "Hausa", "Yoruba"];
    $scope.languageLevel = ["Select Level", "Native", "Expert", "Professional", "Elementary"]
    $scope.speakLanguages = [];
    $scope.newLanguage = "Select Language";
    $scope.newLevel = "Select Level";
    $scope.totalFee = 0;
    $scope.profileTitle = "";
    $scope.profileOverview = "";
    $scope.phoneNumber = "";
    // $scope.trainingFrom = ;
    // $scope.trainingTo = ;
    $scope.trainingDescription = "";
    $scope.previewImage = "assets/images/author/img_avatar.png";
    $scope.profileImage = "assets/images/author/img_avatar.png";
    $scope.resultImage = "assets/images/author/img_avatar.png";
    let user = {};
    user.fname = readCookie("fname");
    user.lname = readCookie("lname");
    $scope.user = user;
    $scope.form = [];
    const token = readCookie("access_token");
    $scope.rectangleWidth = 400;
    $scope.rectangleHeight = 400;
    $scope.CurrentDate = new Date();
    $scope.cropper = {
        cropWidth: $scope.rectangleWidth,
        cropHeight: $scope.rectangleHeight
    };

    $http.post(WSURL + 'partnerapi/api/type/login/page/appcheck').then(function(response) {
        $scope.monthlist = response.month;
        $scope.yearlist = response.year;
        $scope.daylist = response.day;
        // console.log(response);
        $scope.countrylist = response.data.country;
        $scope.countryids = response.countryids;
        $scope.dialingcodes = response.dialingcodes;
        $scope.uniquecode = response.uniquecode;

    });

    // $http.defaults.headers.common.Authorization = `Bearer ${token}`;

    $http.get(BASE_URL + "/api/user", { headers: { 'Authorization': `Bearer ${token}` } }).then(response => {

        if (response.data.user.specialise_countries) {
            $scope.specialiseCountries = JSON.parse(response.data.user.specialise_countries);
        }

        $scope.experienceLevel = response.data.user.countries_level;
        $scope.trainingFrom = Number(response.data.user.training_from);
        $scope.trainingTo = Number(response.data.user.training_to);
        $scope.totalFee = Number(response.data.user.totalFee);
        $scope.trainingDescription = response.data.user.training_description;
        // $scope.trainingTo = response.data.user.training_to;
        if (response.data.user.speak_languages)
            $scope.speakLanguages = JSON.parse(response.data.user.speak_languages);
        $scope.profileTitle = response.data.user.profile_title;
        $scope.profileOverview = response.data.user.profile_overview;
        var profile__image = BASE_URL + "/public" + response.data.user.profile_image;
        $scope.profileImage = profile__image;
        $scope.previewImage = profile__image;
        $scope.phoneVerificationNumber = response.data.user.phone_verification_number;
        $scope.phoneVerifiedAt = response.data.user.phone_verified_at;
    });

    $scope.isActive = function(activeStep) {
        return activeStep === $scope.step;
    }
    $scope.addSpecialiseCountry = function(country) {
        console.log(country);
        $scope.specialiseCountries.push(country);
        console.log("-------Speicalise Countries----------", $scope.specialiseCountries);
    }
    $scope.removeSpecialiseCountry = function(country) {
        $scope.specialiseCountries = $scope.specialiseCountries.filter(countries => countries !== country);
    }
    $scope.setStep = function(step) {
        $scope.error = "";
        $scope.step = step;
        console.log("-------Current Step-----------------", $scope.step);
        console.log("-------Language Level-----------------", $scope.speakLanguages);
    }
    $scope.addLanguage = function(newLanguage, newLevel) {
        const language = {}
        language.name = newLanguage;
        language.level = newLevel;
        $scope.speakLanguages.push(language);
        $scope.newLanguage = "Select Language";
        $scope.newLevel = "Select Level";
        console.log($scope.speakLanguages);
        console.log(JSON.stringify($scope.speakLanguages));
        // let json = {};
        // json.languages = $scope.speakLanguages;

    }

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    $scope.imageSave = function(resultImage) {


        $scope.profileImageFile = $scope.previewImageFile;
        console.log(resultImage)
        $scope.profileImage = resultImage;
        var file = dataURLtoFile(resultImage, 'result.jpg');

        const formData = new FormData();
        formData.append('userId', readCookie('userId'));
        formData.append('profileImageFile', file);

        var request = {
            method: 'POST',
            url: BASE_URL + '/api/updateProfileImage',
            data: formData,
            headers: {
                'Content-Type': undefined,
                'Authorization': `bearer ${token}`
            }
        };
        $http(request)
            .then(function success(e) {

                console.log(e);
            }, function error(e) {
                // $scope.errors = e.data.errors;
                console.log(e);
            });

    }
    $scope.onFileChange = function(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $scope.previewImage = e.target.result;
                $scope.$apply(function() {
                    $scope.previewImage = e.target.result;
                })
            }

            reader.readAsDataURL(event.target.files[0]);
            $scope.previewImageFile = event.target.files[0];

        }


    }
    $scope.goTrainingTab = function(experienceLevel) {
        $scope.error = "";
        $scope.experienceLevel = experienceLevel;
        var data = {
            'userId': readCookie('userId'),
            'specialiseCountries': JSON.stringify($scope.specialiseCountries),
            'experienceLevelCountry': $scope.experienceLevel
        };
        console.log(data);
        $http.post(BASE_URL + "/api/updateExpertise", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                $scope.step = "step2";

                console.log(response);
            }
        });
    }

    $scope.goLanguagesTab = function(trainingFrom, trainingTo, trainingDescription) {
        $scope.error = "";
        console.log("----Training From----", trainingFrom);
        console.log("----Training End----", trainingTo);
        console.log("----Training Description----", trainingDescription);
        $scope.trainingFrom = trainingFrom;
        $scope.trainingTo = trainingTo;
        $scope.trainingDescription = trainingDescription;
        var data = {
            'userId': readCookie('userId'),
            'trainingFrom': trainingFrom,
            'trainingDescription': trainingDescription,
            'trainingTo': trainingTo
        };
        console.log(data);
        $http.post(BASE_URL + "/api/updateTraining", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                $scope.step = "step3";

                console.log(response);
            }
        });
    }
    $scope.goFeesTab = function() {
        $scope.error = "";
        var data = {
            'userId': readCookie('userId'),
            'speakLanguages': JSON.stringify($scope.speakLanguages)

        };
        console.log(data);
        $http.post(BASE_URL + "/api/updateLanguages", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                $scope.step = "step4";

                console.log(response);
            }
        });
    }
    $scope.goOverviewTab = function(totalFee) {
        $scope.error = "";
        $scope.totalFee = totalFee;
        var data = {
            'userId': readCookie('userId'),
            'totalFees': totalFee

        };
        console.log(data);
        $http.post(BASE_URL + "/api/updateFees", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                $scope.step = "step5";

                console.log(response);
            }
        });
    }
    $scope.goProfilePhotoTab = function(profileTitle, profileOverview) {
        $scope.error = "";
        $scope.profileTitle = profileTitle;
        $scope.profileOverview = profileOverview;
        var data = {
            'userId': readCookie('userId'),
            'profileTitle': profileTitle,
            'profileOverview': profileOverview

        };
        console.log(data);
        $http.post(BASE_URL + "/api/updateProfile", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                $scope.step = "step6";
            }
        });
    }
    $scope.goLocationTab = function() {
        $scope.error = "";

        $scope.step = "step7";

    }
    $scope.sendVerificationCode = function(dialingCode, phoneNumber) {
        $scope.error = "";
        $scope.phoneNumber = phoneNumber;
        $scope.dialingCode = dialingCode;
        $scope.phonenum = "+" + dialingCode.toString() + " " + phoneNumber.toString();
        console.log($scope.phonenum);
        var data = {
            'userId': readCookie('userId'),
            'phoneVerificationNumber': $scope.phonenum,
        };
        console.log(data);
        $http.post(BASE_URL + "/api/sendVerificationCode", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                console.log(response);
                $scope.step = "step8";
            }
        }, function(error) {
            $scope.msg = "Please input correct phone number";
        });

    }
    $scope.resendVerificationCode = function() {
        $scope.msg = "";

        var data = {
            'userId': readCookie('userId'),
            'phoneVerificationNumber': $scope.phoneNumber,
        };
        console.log(data);
        $http.post(BASE_URL + "/api/sendVerificationCode", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                $scope.msg = "Sent verification number again";
                console.log(response);
            }
        });

    }
    $scope.checkVerification = function(digitalCode) {
        $scope.msg = "";
        $scope.error = "";
        var data = {
            'userId': readCookie('userId'),
            'phoneVerificationNumber': $scope.phoneNumber,
            'verificationCode': digitalCode
        };
        console.log(data);
        $http.post(BASE_URL + "/api/checkVerificationCode", data, { headers: { 'Authorization': `Bearer ${token}` } }).then(function(response) {
            if (response.status === 200) {
                console.log(response);
                $location.path('/admin/visa_counsellor_profile');
            }
        }, function(err) { //second function "error"
            $scope.error = err.data.error_msg;
        });
    }
    $scope.verificationAgain = function() {
        $scope.phoneVerifiedAt = "";
    }
    $scope.goProfile = function() {
        $location.path('/admin/visa_counsellor_profile');
    }

}]);