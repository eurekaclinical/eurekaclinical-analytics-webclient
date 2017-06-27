(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.index.service:NewsAndFundingService
     * @description
     * Gets version history and funding information.
     */
    
    angular
	.module('eureka.index')
	.service('index.NewsAndFundingService',
		 ['$http', '$q',
		  function($http, $q) {
		      return {
			  getVersionHistory: getVersionHistory,
			  getSupportedBy: getSupportedBy
		      };

		      function getVersionHistory() {
			  return $http.get('assets/data/version_history.json')
			      .then(handleSuccess, handleError);
		      }

		      function getSupportedBy() {
			  return $http.get('assets/data/supported_by.json')
			      .then(handleSuccess, handleError);
		      }

		      function handleSuccess(response) {
			  return response.data;
		      }

		      function handleError(response) {
			  if (!angular.isObject(response.data) && !response.data) {
			      if (response.statusText) {
				  return ($q.reject(response.statusText));
			      } else {
				  return ($q.reject('The server may be down.'));
			      }
			  }
			  return ($q.reject(response.data));
		      }
		  }

		 ]);

}());
