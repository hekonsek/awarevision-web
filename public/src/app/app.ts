/// <reference path="../../../typings/main.d.ts" />

angular.module('myappApp', [
    'app.demo',
    'app.camera',
    'app.templates'
]).controller("appCtrl", ['$scope', function($scope : any) {
    $scope['tab'] = 'home';
    $scope['home'] = function () {
        $scope['tab'] = 'home';
    };
    $scope['camera'] = function () {
        $scope['tab'] = 'camera';
    };}]);

// your app setup here