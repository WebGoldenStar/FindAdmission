var app = angular.module("myApp", ["ngRoute", 'route-segment', 'view-segment']);
var WSURL = "https://api.findadmission.com/";
app.config(function($routeSegmentProvider) {
    $routeSegmentProvider.
    when('/', 'home').
    when('/home', 'home').
    when('/home/login', 'home.login').
    when('/home/register', 'home.register').

    when('/admin', 'admin').
    when('/admin/dashboard', 'admin.dashboard').
    when('/admin/visa_counsellor', 'admin.visa_counsellor');

    $routeSegmentProvider.segment('home', {
        default: true,
        templateUrl: 'home.html',
    });
    $routeSegmentProvider.within('home').segment('login', {
        default: true,
        templateUrl: 'views/auth/login.html'
    });
    $routeSegmentProvider.within('home').segment('register', {
        templateUrl: 'views/auth/register.html'
    });
    $routeSegmentProvider.segment('admin', {
        templateUrl: 'admin.html',
        controller: 'adminController'
    });
    $routeSegmentProvider.within('admin').segment('dashboard', {
        default: true,
        templateUrl: 'views/admin/dashboard.html',
        controller: 'dashboardController'
    });
    $routeSegmentProvider.within('admin').segment('visa_counsellor', {
        templateUrl: 'views/admin/visa_counsellor.html',
    });
});