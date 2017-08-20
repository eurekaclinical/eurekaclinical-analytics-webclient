(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name eureka
     * @description
     *
     * # Eureka Documentation
     *
     * Do you need help understanding the project structure or what services and directives you have available to you
     * in the Eureka Angular application? You've come to the right place!
     *
     * ## How to use this documentation
     *
     * This code-base is self-documenting; this documentation is automatically generated from comments left throughout
     * the code. If there is a problem with it, it is because the comments in the code were not updated.
     *
     * This project is broken down into several modules. Each module represents a section of the application. Inside
     * each module you will find views, directives, and services specific to that module. This allows you to bite off
     * code changes in smaller pieces and keeps everything organized in a sane manner.
     *
     * @requires ui.router
     * @requires ui.tree
     * @requires angularValidator
     * @requires cohorts
     * @requires phenotypes
     * @requires register
     */
    
    angular.module('eureka', [
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.datepickerPopup',
        'ui.tree',
        'angularValidator',
        'ngMessages',
        'ngTable',
	    'ngCookies',
        'eureka.cohorts',
        'eureka.phenotypes',
        'eureka.help',
        'eureka.jobs',
        'eureka.datasets',
	    'eureka.index',
	    'eureka.logout',
        'flow']);

    angular.module('eureka').run(eurekaRun);
    angular.module('eureka').config(eurekaConfig);

    eurekaRun.$inject = ['$rootScope', 'ProxyService', 'UserService', 'ConfigFileService', 'CookieService'];
    eurekaConfig.$inject = ['$urlRouterProvider'];

    function eurekaRun($rootScope, ProxyService, UserService, ConfigFileService, CookieService) {
        
        ProxyService.getAppProperties()
            .then(function(data) {
		$rootScope.modes = data.appPropertiesModes;
		$rootScope.links = data.appPropertiesLinks;
		$rootScope.registration = data.appPropertiesRegistration;
            });
        
	$rootScope.userVerficationPerformed = false;
	
	$rootScope.inceptionYear = '2012';
	$rootScope.currentYear = new Date().getFullYear();
	$rootScope.service = function() {
	    var location = window.location;
	    return location.protocol + '//' + location.host + location.pathname;
	}();
	
	CookieService.putIfValuePresent();
	
	ConfigFileService.getConfig()
	    .then(function(data) {
		$rootScope.casLoginUrl = data.casLoginUrl;
		ProxyService.getSession()
		    .then(function() {
			UserService.getUser().then(function(user) {
			    $rootScope.user = user;
			    $rootScope.userVerficationPerformed = true;
			});
		    }, function(msg) {
			$rootScope.userVerficationPerformed = true;
		    });
	    }, function() {
		$rootScope.userVerficationPerformed = true;
	    })
    }

    function eurekaConfig($urlRouterProvider){
	$urlRouterProvider.otherwise('/index');
    }
    

}());
