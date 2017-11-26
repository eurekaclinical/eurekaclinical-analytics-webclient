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
    
    MainCtrl.$inject = ['$rootScope', 'ProxyService'];

    function MainCtrl($rootScope, ProxyService) {
        var vm = this;

	vm.inProgress = true;
	vm.success = false;

        ProxyService.destroySession().then(success, error);

	function success() {
	    vm.inProgress = false;
	    vm.success = true;
	    window.location.href = $rootScope.logoutUrl;
	}

	function error(msg) {
	    vm.inProgress = false;
	    vm.errorMsg = msg;
	}
    }
})();
