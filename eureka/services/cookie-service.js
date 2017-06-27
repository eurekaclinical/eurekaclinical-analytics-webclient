(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name eureka.service:CookieService
     * @description
     * This service manages session cookies for the Eureka! Clinical Analytics Webclient.
     * @requires $http
     * @requires $q
     * @requires eureka.ProxyService
     */

    angular
        .module('eureka')
        .factory('CookieService', CookieService);

    CookieService.$inject = ['$cookies'];

    function CookieService($cookies) {
	var cookieName = 'eurekaclinical-analytics-webclient';

        return {
            get: get,
            remove: remove,
	    putIfValuePresent: putIfValuePresent
        };

        function get() {
	    return $cookies.get(cookieName);
	}

	function remove() {
	    $cookies.remove(cookieName);
	    $cookies.remove('JSESSIONID');
	}

	function putIfValuePresent() {
	    var match, i;
	    var adr = location.href;
	    match = /ticket=([^&#]*)/.exec(adr);
	    var ticket = match ? match[1] : null;
	    if (ticket) {
		$cookies.put(cookieName, ticket);
	    }
	}
        
    }

}());
