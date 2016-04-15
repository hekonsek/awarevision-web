/// <reference path="../../../typings/main.d.ts" />

module app.camera {

    'use strict';

    declare var keycloak: any;

    export interface IcameraCtrl {}
    export class cameraCtrl implements IcameraCtrl {

        scope: any;
        location: ng.ILocationService;
        http: ng.IHttpService;
        timeout: ng.ITimeoutService;

        constructor(
            $scope: ng.IScope,
            $location: ng.ILocationService,
            $http: ng.IHttpService,
            $timeout: ng.ITimeoutService
        ){
            this.scope = $scope;
            this.location = $location;
            this.http = $http;
            this.timeout = $timeout;

            $timeout(function(){
                $http.defaults.headers.common['Authorization'] = 'bearer ' + keycloak.token;
                $http.get('http://' + $location.host() + ':8080/document/count/foo').success(function (data : any) {
                    $scope['count'] = data.payload;
                }).error(function () {
                    console.error('Error loading document count.')
                });
            }, 1000);
        }

    }

    export interface IcameraService {
        getExcited: boolean;
    }

    export class cameraService implements IcameraService {

        http: ng.IHttpService;

        constructor(
            $http: ng.IHttpService
        ){
            this.http = $http;
        }

        getExcited: boolean = false;

    }

    angular
        .module('app.camera', [])
        .directive("camera", function(): ng.IDirective {
            return {
                templateUrl: 'app-templates/camera/camera.html',
                controller:  cameraCtrl,
                controllerAs: 'cameraCtrlVM'
            };
        })
        .controller("cameraCtrl", cameraCtrl)
        .factory("cameraService", cameraService);
}
