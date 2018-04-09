/* globals self */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.TreeService
     * @description
     * This will provide all services for tree component
     */

    angular
        .module('eureka')
        .factory('TreeService', TreeService);

    TreeService.$inject = ['$http', '$q', 'ProxyService'];

    function TreeService($http, $q, ProxyService) {

        return ({
            getTreeRoot: getTreeRoot,
            getTreeNode: getTreeNode,
            getTreeNodes: getTreeNodes
        });

        function getTreeRoot() {
            return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/concepts')
                    .then(handleSuccess, handleError);
	    }, handleError);
        }

        function getTreeNode(key) {
            if (key === 'root') {
		return ProxyService.getDataEndpoint().then(function(url) {
                    return $http.get(url + '/concepts/')
			.then(handleSuccess, handleError);
		}, handleError);
	    } else {
		return ProxyService.getDataEndpoint().then(function(url) {
		    let postBody = 'key=' + key;
		    return $http.post(url + '/concepts', postBody)
		    .then(
			function(response) {
			    if (response.data.length > 0) {
				return response.data[0];
			    } else {
				return $q.reject('Not found');
			    }
			}, 
			handleError);
		}, handleError);
                
            }
        }

        function getTreeNodes(keys, summarize) {
            if (summarize === undefined) {
                summarize = false;
            }
	    let postBody = 'summarize=' + summarize;
	    for (let i = 0; i < keys.length; i++) {
		postBody += '&';
		postBody += 'key=' + keys[i];
	    }
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.post(url + '/concepts', postBody)
		    .then(function(response) {
			return response.data;
		    }, 
			  handleError);
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
