(function(){
	'use strict';

    /**
     * @ngdoc overview
     * @name eureka.datasets
     * @description
     * The module for the datasets section of the Eureka application.
     */
	angular.module('eureka.datasets', []);

  angular.module('eureka.datasets').config(datasetsConfig);

  datasetsConfig.$inject = ['$stateProvider'];

	function datasetsConfig($stateProvider) {

    $stateProvider
    	.state('datasets', {
        url: '/datasets',
        templateUrl: 'eureka/datasets/views/main/main.html',
        controller: 'datasets.MainCtrl',
        controllerAs: 'datasets'
      })
	}


}());