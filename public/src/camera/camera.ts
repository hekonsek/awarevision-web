/// <reference path="../../../typings/main.d.ts" />

module app.camera {

    'use strict';

    declare var keycloak:any;

    export interface IcameraCtrl {
    }
    export class cameraCtrl implements IcameraCtrl {

        scope:any;
        location:ng.ILocationService;
        http:ng.IHttpService;
        timeout:ng.ITimeoutService;
        interval:ng.IIntervalService;


        constructor($scope:ng.IScope,
                    $location:ng.ILocationService,
                    $http:ng.IHttpService,
                    $timeout:ng.ITimeoutService,
                    $interval:ng.IIntervalService) {
            this.scope = $scope;
            this.location = $location;
            this.http = $http;
            this.timeout = $timeout;
            this.interval = $interval;

            var camerasPreview = function () {
                $http.defaults.headers.common['Authorization'] = 'bearer ' + keycloak.token;
                $http.get('http://' + $location.host() + ':8080/device/list').success(function (data:any) {
                    $scope['cameras'] = data.payload;
                    $scope['currentImage'] = {};
                    $scope['currentPlate'] = {};
                    for (var i = 0; i < $scope['cameras'].length; i++) {
                        var deviceId = $scope['cameras'][i].deviceId;
                        $http.post('http://' + $location.host() + ':8080/document/findByQuery/CameraImage', {
                            payload: {
                                query: {deviceId: deviceId},
                                size: 1,
                                sortAscending: false
                            }
                        }).success(function (data, status, headers, config) {
                            $scope['currentImage'][data['payload'][0].deviceId] = 'http://' + $location.host() + ':8080/binary/read/' + data['payload'][0].id;
                            $scope['currentPlate'][data['payload'][0].deviceId] = data['payload'][0].plateMatches[0].plateNumber;
                        }).error(function (data, status, headers, config) {
                            console.error('Error loading camera image data.');
                        });
                    }
                }).error(function (data, status, headers, config) {
                    console.error('Error loading cameras data.');
                });
            };

            $timeout(camerasPreview, 500);
            $interval(camerasPreview, 5000);
        }

    }

    angular
        .module('app.camera', [])
        .directive("camera", function ():ng.IDirective {
            return {
                templateUrl: 'app-templates/camera/camera.html',
                controller: cameraCtrl,
                controllerAs: 'cameraCtrlVM'
            };
        })
        .controller("cameraCtrl", cameraCtrl);

}