(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name eureka.controller:IdleTimeoutCtrl
     * @description
     * Automatically logs the user out before the eureka-webapp proxy session times out.
     * @requires ProxyService
     */
    
    angular
        .module('eureka')
        .controller('IdleTimeoutCtrl', IdleTimeoutCtrl);

    IdleTimeoutCtrl.$inject = ['ProxyService'];

    function IdleTimeoutCtrl(ProxyService) {
	let vm = this;

        vm.getSessionProperties = function() {
            return ProxyService.getSessionProperties();
        };
    }
}());
