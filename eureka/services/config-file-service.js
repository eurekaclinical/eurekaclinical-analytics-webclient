(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.service:ConfigFileService
     * @description 
     * Gets the contents of the config file for the web client, 'config.json'.
     */
    angular
	.module('eureka')
	.service('ConfigFileService',
		 ['$http', '$q',
		  function ($http, $q) {
		      return {
			  getConfig: getConfig
		      };

		      function getConfig() {
			  return $http.get('config.json')
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
				  return ($q.reject('The config file is missing or malformed.'));
			      }
			  }
			  return ($q.reject(response.data));
		      }
		  }]);
}());
