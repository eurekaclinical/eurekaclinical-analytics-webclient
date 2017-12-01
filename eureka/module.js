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
	'eureka.index',
	'eureka.logout',
        'flow']);

    angular.module('eureka').run(eurekaRun);
    angular.module('eureka').config(eurekaConfig);

    eurekaRun.$inject = ['$rootScope', 'ProxyService', 'UserService', 'ConfigFileService', '$window', '$timeout'];
    eurekaConfig.$inject = ['$urlRouterProvider'];

    function eurekaRun($rootScope, ProxyService, UserService, ConfigFileService, $window, $timeout) {
        
	$rootScope.userVerficationPerformed = false;
	
	$rootScope.service = (function() {
	    var location = $window.location;
	    return location.protocol + '//' + location.host + location.pathname;
	}());

	function parseTicket() {
	    var match, i;
	    var adr = location.href;
	    match = /ticket=([^&#]*)/.exec(adr);
	    return match ? match[1] : null;
	}

	$rootScope.inceptionYear = '2012';
	$rootScope.currentYear = new Date().getFullYear();

	function setupSession() {
	    function sessionBroken() {
		ProxyService.destroySession()
		    .then(function() {
			$timeout(function() {
			    $window.location.href = $rootScope.service;
			}, 500);
		    },
			  function() {
			      $rootScope.userVerficationPerformed = true;
			  });
	    }

	    function getAppProperties() {
		ProxyService.getAppProperties()
		    .then(function(data) {
			$rootScope.modes = data.appPropertiesModes;
			$rootScope.links = data.appPropertiesLinks;
			$rootScope.registration = data.appPropertiesRegistration;
			$rootScope.userVerficationPerformed = true;
		    }, function() {
			sessionBroken();
		    });
	    }

	    function getUser() {
		UserService.getUser().then(function(user) {
		    $rootScope.user = user;
		    getAppProperties();
		}, function() {
		    sessionBroken();
		});
	    }
	    
	    ConfigFileService.getConfig()
		.then(function(data) {
		    $rootScope.casLoginUrl = data.casLoginUrl;
		    $rootScope.logoutUrl = data.logoutUrl;
		    $rootScope.userWebappUrl = data.userWebappUrl; //temp solution
		    ProxyService.getSession()
			.then(function() {
			    if (parseTicket()) {
				$window.location.href = $rootScope.service;
			    }
			    getUser();
			}, function() {
			    if (parseTicket()) {
				$window.location.href = $rootScope.service;
			    } else {
				getAppProperties();
			    }
			});
		}, function(msg) {
		    console.log(msg);
		    $rootScope.userVerficationPerformed = true;
		});
	}
	
	setupSession();
    }

    function eurekaConfig($urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');
    }
    

}());
