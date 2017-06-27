(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name eureka.index.controller:MainCtrl
     * @description populates the news and funding panels on the main page.
     * @requires index.NewsAndFundingService
     */
    angular
	.module('eureka.index')
	.controller('index.MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$sce', 'index.NewsAndFundingService'];
    
    function MainCtrl($scope, $sce, NewsAndFundingService) {
	
	NewsAndFundingService.getVersionHistory()
	    .then(function(data){                  
		$scope.versionHistory = data.versionHistory;
	    }, function(msg) {
		$scope.versionHistory = 'Error! ' + msg;
	    });

	NewsAndFundingService.getSupportedBy()
	    .then(function(data) {       
		var result = data.supportedBy.slice(0, -1).join('; ');
		if (data.supportedBy.length > 1) {
		    result += '; and ';
		}
		result += data.supportedBy[data.supportedBy.length - 1];
		$scope.supportedByHTML = $sce.trustAsHtml(result);
	    }, function(msg) {
		$scope.supportedByHTML = 'Error! ' + msg;
	    });
    }
}());
