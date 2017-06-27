(function(){
    'use strict';

    /**
     * @ngdoc overview
     * @name eureka.logout
     * @description
     * The module for the logout section of the Eureka application.
     */
    angular.module('eureka.logout', []);

    angular.module('eureka.logout').config(logoutConfig);

    logoutConfig.$inject = ['$stateProvider'];

    function logoutConfig($stateProvider) {

	$stateProvider
    	    .state('logout', {
		url: '/logout',
		templateUrl: 'eureka/logout/views/main.html',
		controller: 'logout.MainCtrl',
		controllerAs: 'logout'
	    });
	
    }

}());
