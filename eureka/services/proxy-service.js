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

    ProxyService.$inject = ['$http', '$q', 'ConfigFileService', 'CookieService'];

    function ProxyService($http, $q, ConfigFileService, CookieService) {
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
		    return getEurekaClinicalSession(data.eurekaWebappUrl)
			.then(handleSuccess, handleError);
		}, handleError);
	}

	function destroySession() {
	    CookieService.remove();
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

	function getEurekaClinicalSession(eurekaWebappUrl) {
	    
	    return $q((resolve, reject) => {
		let theIframe = document.createElement('iframe');
		theIframe.src = eurekaWebappUrl + '/protected/get-session';
		let timeout = null;
		
		function receiveMessage(event) {
		    theIframe = document.body.removeChild(theIframe);
		    window.removeEventListener('message', receiveMessage, false);
		    if (timeout) {
			clearTimeout(timeout);
		    }
		    var origin = event.origin || event.originalEvent.origin;
		    if (eurekaWebappUrl.startsWith(origin)) {
			resolve({data: ''});
		    } else {
			reject({data: {status: 400, statusText: 'Bad Request'}});
		    }
		}
		window.addEventListener('message', receiveMessage, false);

		function onTimeout() {
		    window.removeEventListener('message', receiveMessage);
		    theIframe = document.body.removeChild(theIframe);
		    reject({status: 400, statusText: 'Bad Request'});
		}

		theIframe.style.display = 'none';
		theIframe = document.body.appendChild(theIframe);
		if (CookieService.get()) {
		    timeout = setTimeout(onTimeout, 1000 * 30);
		} else {
		    window.removeEventListener('message', receiveMessage);
		    reject({data: {status: 400, statusText: 'Bad Request'}});
		}
	    });
	    
	}

    }

}());
