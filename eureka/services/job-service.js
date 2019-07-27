(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name eureka.JobService
     * @description
     * This service provides an API to interact with the REST endpoint for jobs.
     * @requires $http
     * @requires $q
     */

    angular
	.module('eureka.jobs')
	.factory('JobService', JobService);

    JobService.$inject = ['$http', '$q', 'ProxyService'];

    function JobService($http, $q, ProxyService) {
	
	return ({
	    submitJob: submitJob,
	    getJobs: getJobs,
	    getJob: getJob,
	    getLatestJobs: getLatestJobs,
	    getDestinations: getDestinations,
	    getSourceConfigs: getSourceConfigs,
	    getJobModes: getJobModes,
	});

	function submitJob(jobSpec) {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.post(url + '/jobs', jobSpec)
		    .then(handleSuccess, handleError);
	    }, handleError);
	    
	}

	function getJobs() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/jobs')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getJob(id) {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/job/' + id)
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	//get a list of existing jobs, with latest one as the first one
	function getLatestJobs() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/jobs/latest')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	//get a list of destinations
	function getDestinations() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/destinations')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	//get a list of sourceConfigs
	function getSourceConfigs() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/sourceconfigs')
		    .then(handleSuccess, handleError);
	    }, handleError);
	}

	function getJobModes() {
	    return ProxyService.getDataEndpoint().then(function(url) {
		return $http.get(url + '/jobmodes')
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
