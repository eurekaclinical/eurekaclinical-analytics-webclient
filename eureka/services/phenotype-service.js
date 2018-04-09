(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.PhenotypeService
     * @description
     * This service provides an API to interact with the REST endpoint for phenotypes.
     * @requires $http
     * @requires $q
     */

    angular
	.module('eureka')
	.factory('PhenotypeService', PhenotypeService);

    PhenotypeService.$inject = ['$http', '$q', 'ProxyService'];

    function PhenotypeService($http, $q, ProxyService) {
	return ({
	    getPhenotypeMessages: getPhenotypeMessages,
	    getPhenotypeRoot: getPhenotypeRoot,
	    createPhenotype: createPhenotype,
	    getPhenotype: getPhenotype,
	    updatePhenotype: updatePhenotype,
	    removePhenotype: removePhenotype,
	    getTimeUnits: getTimeUnits,
	    getFrequencyTypes: getFrequencyTypes,
	    getThresholdsOperators: getThresholdsOperators,
	    getValueComparators: getValueComparators,
	    getRelationOperators: getRelationOperators
	});

	function getPhenotypeMessages() {
	    return [
		{
		    name: 'CATEGORIZATION',
		    description: 'Categorization',
		    longDescription: 'For defining a significant category of codes or clinical events or observations.'
		},
		{
		    name: 'SEQUENCE',
		    description: 'Sequence',
		    longDescription: 'For defining a disease, finding or patient care process to be reflected by codes, clinical events and/or observations in a specified sequential temporal pattern.'
		},
		{
		    name: 'FREQUENCY',
		    description: 'Frequency',
		    longDescription: 'For defining a disease, finding or patient care process to be reflected by codes, clinical events and/or observations in a specified frequency.'
		},
		{
		    name: 'VALUE_THRESHOLD',
		    description: 'Value threshold',
		    longDescription: 'For defining clinically significant thresholds on the value of an observation.'
		}
	    ];
	}
	
	function getPhenotypeRoot() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/phenotypes?summarize=true')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function createPhenotype(newObject) {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.post(url + '/phenotypes', newObject)
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function updatePhenotype(updateObject) {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.put(url + '/phenotypes/' + updateObject.id, updateObject)
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getPhenotype(key, summarize) {
	    if (summarize === undefined) {
		summarize = false;
	    }
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/phenotypes/' + key + '?summarize=' + summarize)
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function removePhenotype(id) {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http['delete'](url + '/phenotypes/' + id)
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getTimeUnits() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		 return $http.get(url + '/timeunits')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getFrequencyTypes() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/frequencytypes')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getThresholdsOperators() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/thresholdsops')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getValueComparators() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/valuecomps')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getRelationOperators() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/relationops')
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
