// JavaScript Document
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload',
    "ngMap",
    "internationalPhoneNumber",
    'ui.bootstrap',
    'ui.select',
    'ngAnimate',
    'toastr',
    'textAngular',
    'ngSanitize',
    'ngMap',
    'toggle-switch',
    'cfp.hotkeys',
    'ui.sortable'
]);

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider

        .state('dashboard-main', {
            url: "/dashboard-main",
            templateUrl: "views/template.html",
            controller: 'DashboardmainCtrl',
        })

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl',
        })

        .state('enquiries', {
            url: "/enquiries",
            templateUrl: "views/template.html",
            controller: 'EnquiriesCtrl',
        })

        .state('sources', {
            url: "/sources",
            templateUrl: "views/template.html",
            controller: 'SourcesCtrl',
        })

        .state('customers', {
            url: "/customers",
            templateUrl: "views/template.html",
            controller: 'CustomersCtrl',
        })
        .state('report', {
            url: "/report",
            templateUrl: "views/template.html",
            controller: 'ReportCtrl',
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "views/template.html",
            controller: 'ProfileCtrl',
        })
        .state('enquiryinside', {
            url: "/enquiryinside",
            templateUrl: "views/template.html",
            controller: 'EnquiryinsideCtrl',
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('page', {
            url: "/page/:id/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'PageJsonCtrl'
        })

        .state('loginapp', {
            url: "/login/:id",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('country-list', {
            url: "/country-list/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'CountryCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcountry', {
            url: "/country-create",
            templateUrl: "views/template.html",
            controller: 'CreateCountryCtrl'
        })

        .state('editcountry', {
            url: "/country-edit/:id",
            templateUrl: "views/template.html",
            controller: 'EditCountryCtrl'
        })

        .state('schema-creator', {
            url: "/schema-creator",
            templateUrl: "views/template.html",
            controller: 'SchemaCreatorCtrl'
        })

        .state('excel-upload', {
            url: "/excel-upload/:model",
            templateUrl: "views/template.html",
            controller: 'ExcelUploadCtrl'
        })
        .state('add-admin', {
            url: "/add-admin",
            templateUrl: "views/template.html",
            controller: 'AddadminCtrl'
        })
        .state('jagz', {
            url: "/jagz",
            templateUrl: "views/jagz.html",
            controller: 'JagzCtrl'
        })
        .state('interview-schedule', {
            url: "/interview-schedule",
            templateUrl: "views/template.html",
            controller: 'InterviewscheduleCtrl'
        })
        .state('interview-type', {
            url: "/interview-type",
            templateUrl: "views/template.html",
            controller: 'InterviewTypeCtrl'
        });

    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(isproduction);
});

myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});