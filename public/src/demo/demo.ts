/// <reference path="../../../typings/main.d.ts" />

module app.demo {

    'use strict';

    export interface IDemoCtrl {}
    export class DemoCtrl implements IDemoCtrl {

        scope: any;
        http: ng.IHttpService;

        constructor(
            $scope: ng.IScope,
            $http: ng.IHttpService
        ){
            this.scope = $scope;
            this.http = $http;

            this.scope.hello = function () {
                $scope['foo'] = 'bar';
            }
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
