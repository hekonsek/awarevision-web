/// <reference path="../../../typings/main.d.ts" />

module app.demo {

    'use strict';

    declare var keycloak: any;

    export interface IDemoCtrl {}
    export class DemoCtrl implements IDemoCtrl {

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

    export interface IDemoService {
        getExcited: boolean;
    }

    export class DemoService implements IDemoService {

        http: ng.IHttpService;

        constructor(
            $http: ng.IHttpService
        ){
            this.http = $http;
        }

        getExcited: boolean = false;

    }

    angular
        .module('app.demo', [])
        .directive("demo", function(): ng.IDirective {
            return {
                templateUrl: 'app-templates/demo/demo.html',
                controller:  DemoCtrl,
                controllerAs: 'demoCtrlVM'
            };
        })
        .controller("demoCtrl", DemoCtrl)
        .factory("demoService", DemoService);
}
