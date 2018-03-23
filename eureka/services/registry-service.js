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
        .factory('RegistryService', RegistryService);

    RegistryService.$inject = ['$http', '$q'];

    function RegistryService($http, $q) {
	var proxyEndpoint = 'eureka-webapp/proxy-resource';

        return ({
	    getUserMenuItems: getUserMenuItems,
        });

	function getUserMenuItems() {
	    return $http.get(proxyEndpoint + '/components?type=WEBAPP&type=EXTERNAL')
		.then(handleSuccess, handleError404MeansEmptyArray);
	}

        function handleSuccess(response) {
	    return response.data;
        }

        function handleError404MeansEmptyArray(response) {
	    if (!angular.isObject(response.data) && !response.data) {
		if (response.status === 404) {
		    return [];
		} else if (response.statusText) {
		    return ($q.reject(response.statusText));
                } else {
		    return ($q.reject('The server may be down.'));
                }
	    }
	    return ($q.reject(response.data));
        }

    }

}());
