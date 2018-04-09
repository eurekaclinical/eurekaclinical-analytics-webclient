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
		      var data = null;
		      return {
			  getConfig: getConfig
		      };

		      function getConfig() {
			  if (data !== null) {
			      return $q.defer().promise.then(function() {return data});
			  } else {
			      return $http.get('config.json')
				  .then(handleSuccess, handleError);
			  }
		      }

		      function handleSuccess(response) {
			  //data = response.data;
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
