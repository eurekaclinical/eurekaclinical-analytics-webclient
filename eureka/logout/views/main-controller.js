(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name eureka.logout.controller:MainCtrl
     * @description
     * This is the main controller for the logout section of the application.
     * @requires cohorts.CohortService
     */
    
    angular
        .module('eureka.logout')
        .controller('logout.MainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['ProxyService', 'ConfigFileService'];

    function MainCtrl(ProxyService, ConfigFileService) {
        var vm = this;

	vm.inProgress = true;
	vm.success = false;

        ProxyService.destroySession().then(success, error);

	function success() {
	    vm.inProgress = false;
	    vm.success = true;
	    ConfigFileService.getConfig()
		.then(function (data) {
		    window.location.href = data.logoutUrl;
		}, function (msg) {
		    error(msg);
		});
	    
	}

	function error(msg) {
	    vm.inProgress = false;
	    vm.errorMsg = msg;
	}
    }
})();
