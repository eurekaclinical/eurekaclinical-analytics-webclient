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

    ProxyService.$inject = ['$rootScope', '$http', '$q', 'ConfigFileService'];

    function ProxyService($rootScope, $http, $q, ConfigFileService) {

        return ({
            getSessionProperties: getSessionProperties,
	    getSession: getSession,
	    destroySession: destroySession,
	    getDataEndpoint: getDataEndpoint,
	    getAppProperties: getAppProperties
        });

	function getDataEndpoint() {
	    return getOpenEndpoint().then(function(url) {
		return url + '/proxy-resource';
	    }, handleError);
	}

	function getProtectedEndpoint() {
	    return getOpenEndpoint().then(function(url) {
		return url + '/protected';
	    }, handleError);
	}

	function getOpenEndpoint() {
	    return ConfigFileService.getConfig().then(
		function(config) {
		    return config.eurekaWebappUrl;
		}, handleError);
	}

	function getSession() {
	    return getProtectedEndpoint().then(function(url) {
		return $http.get(url + '/get-session')
		    .then(handleSuccess, handleError);	
	    });
	}

	function destroySession() {
	    return getOpenEndpoint().then(function(url) {
		return $http.get(url + '/destroy-session')
		    .then(handleSuccess, handleError);
	    });
	}

        function getSessionProperties() {
	    return getProtectedEndpoint().then(function(url) {
		return $http.get(url + '/get-session-properties')
                    .then(handleSuccess, handleError);
	    });
        }

	function getAppProperties() {
	    return getDataEndpoint().then(function(url) {
		return $http.get(url + '/appproperties/')
		    .then(handleSuccess, handleError);
	    }, handleError);
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

}());
