(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.DatasetService
     * @description
     * This service provides an API to interact with the REST endpoint for datasets.
     * @requires $http
     * @requires $q
     */

    angular
        .module('eureka')
        .factory('DatasetService', DatasetService);

    DatasetService.$inject = ['$http', '$q', 'ProxyService'];

    function DatasetService($http, $q, ProxyService) {

        let dataEndpoint = ProxyService.getDataEndpoint();
	
        return ({
            getDatasets: getDatasets
        });

        function getDatasets() {
            return $http.get(dataEndpoint + '/sourceconfig')
                .then(handleSuccess, handleError);
                ///eureka-webapp/proxy-resource/sourceconfig/
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
