(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name eureka.index
     * @description
     * The module for the index page.
     */
    angular.module('eureka.index', []);

    angular.module('eureka.index').config(indexConfig);
    
    indexConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function indexConfig($stateProvider, $urlRouterProvider, $httpProvider){
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'eureka/index/views/main/main.html',
		controller: 'index.MainCtrl'
            });
    }

}());
