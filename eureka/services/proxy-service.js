/* globals self */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.service:SessionService
     * @description 
     * Manages the session with the eureka-webapp proxy.
     */

    angular
        .module('eureka')
        .factory('ProxyService', ProxyService);

    ProxyService.$inject = ['$http', '$q', 'ConfigFileService'];

    function ProxyService($http, $q, ConfigFileService) {
        var dataProtectedEndPoint = getProtectedEndpoint();
	var dataEndpoint = getDataEndpoint();
	var dataOpenEndpoint = getOpenEndpoint();

        return ({
            getSessionProperties: getSessionProperties,
	    getSession: getSession,
	    destroySession: destroySession,
	    getAppProperties: getAppProperties,
	    getDataEndpoint: getDataEndpoint,
	    getProtectedEndpoint: getProtectedEndpoint,
	    getOpenEndpoint: getOpenEndpoint
        });

	function getDataEndpoint() {
	    return 'eureka-webapp/proxy-resource';
	}

	function getProtectedEndpoint() {
	    return 'eureka-webapp/protected';
	}

	function getOpenEndpoint() {
	    return 'eureka-webapp';
	}

	function getSession() {
	    return ConfigFileService.getConfig()
		.then(function (data) {
		    return getEurekaClinicalSession()
			.then(handleSuccess, handleError);
		}, handleError);
	}

	function destroySession() {
	    return $http.get(dataOpenEndpoint + '/destroy-session')
		.then(handleSuccess, handleError);
	}

        function getSessionProperties() {
	    return $http.get(dataProtectedEndPoint + '/get-session-properties')
                .then(handleSuccess, handleError);
        }

	function getAppProperties() {
	    return $http.get(dataEndpoint + '/appproperties/')
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

	function getEurekaClinicalSession() {
	    return $http.get(dataProtectedEndPoint + '/get-session')
		.then(handleSuccess, handleError);
	}

    }

}());
