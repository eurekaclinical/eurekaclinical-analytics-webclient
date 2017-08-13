(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name eureka.datasets.controller:MainCtrl
     * @description
     * This is the main controller for the datasets section of the application.
     * @requires datasets.DatasetService
     */

    angular
        .module('eureka.datasets')
        .controller('datasets.MainCtrl', MainCtrl);

    MainCtrl.$inject = ['DatasetService', 'NgTableParams', '$uibModal'];

    function MainCtrl(DatasetService, NgTableParams, $uibModal) {
        let vm = this;
        let copyData = [];

        vm.currentSelectedItem = {};

        function displayDeleteError(msg) {
            vm.deleteErrorMsg = msg;
        }

        function displayLoadError(msg) {
            vm.loadErrorMsg = msg;
        }

        function success(datasets) {
			vm.copyData = datasets;
            // NG Table
            vm.tableParams = new NgTableParams({}, { dataset: vm.copyData });
        }
		

        DatasetService.getDatasets().then(success, displayLoadError);
    }
})();